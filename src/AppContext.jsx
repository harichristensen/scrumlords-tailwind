
import { createContext, useState, useEffect } from 'react';
import { User, Book } from './models';
import { Auth, DataStore, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';
import { v4 as uuidv4 } from 'uuid';




const AppContext = createContext("", "", "", "", "", "");

export const AppProvider = ({ children, hub }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [currentSelf, setCurrentSelf] = useState('');
  const [currentInfo, setCurrentInfo] = useState('');
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState('');
  const [userList, setUserList] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [signUp, setSignUp] = useState('');
  const [createdSignUp, setCreatedSignUp] = useState('');
  const [signIn, setSignIn] = useState('');
  const [notParsed, setNotParsed] = useState('');
  const [usersNotParsed, setUsersNotParsed] = useState('');
  const [booksNotParsed, setBooksNotParsed] = useState('');
  const [infoNotParsed, setInfoNotParsed] = useState('');
  const [signOut, setSignOut] = useState('');
  const [adminSignUp, setAdminSignUp] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [createUserValue, setCreateUserValue] = useState("");
  let bookSub;
  let userSub;

  const router = useRouter()

  // authentication states
  useEffect(() => {
    console.log(createdSignUp)
    if (signUp === true && !createdSignUp){
      const createUser = async () => {
        const curUser = await Auth.currentAuthenticatedUser()
        console.log("hello")
        try {
          console.log(curUser)
          await DataStore.save(
            new User({
              currentBooks: [], fines: [], admin: false, birthdate: curUser.attributes.birthdate, name: curUser.attributes.name, username: curUser.username, email: curUser.attributes.email
            })
          );
        } catch(e) {
          console.log(e)
        }
      }
      createUser();
      setShowAlert(true);
      setSignUp(false)
    }
    setCreatedSignUp(false)
    checkLogInState()
    }, [signIn]);
  
  useEffect(() => {
    if (signOut === true){
      router.reload()
    }
  }, [signOut]);


  // update user
  useEffect(() => {
    console.log(currentUser)
    console.log(signIn)
    if (signIn === true){
      loadBooks();
      loadUsers();
      
      bookSub = DataStore.observe(Book).subscribe(() => {loadBooks()})
      userSub = DataStore.observe(User).subscribe(() => {loadUsers()})

      return
    }
  }, [currentUser]);

  // update user list and book list
  useEffect(() => {
    if (booksNotParsed && booksNotParsed.length !== 0){
      // const parsedBooks = JSON.parse(JSON.stringify(booksNotParsed))
      // setBookList(parsedBooks)
      setBookList(booksNotParsed)
    }
  }, [booksNotParsed]);

  useEffect(() => {
    if (usersNotParsed && usersNotParsed.length !== 0){
      // const parsedUsers = JSON.parse(JSON.stringify(usersNotParsed))
      // setUserList(parsedUsers)
      usersNotParsed.localeCompare()
      setUserList(usersNotParsed)
    }
  }, [usersNotParsed]);

  const loadBooks = async () => {
    let bookList = await DataStore.query(Book);
    setBookList(bookList)

    // setBooksNotParsed(bookList)
  }

  const loadUsers = async () => {
    let userList = await DataStore.query(User);
    console.log(userList)
    userList.map(user => user.username == currentUser.username ? setCurrentInfo(user) : null);
    setUserList(userList)
    // setUsersNotParsed(userList)
  }


  // check if user has changed sign in/sign out
  const checkLogInState = async () => {
    let curUser;
    try {
      curUser = await Auth.currentAuthenticatedUser()
      if (curUser) setSignIn(true);
      if (curUser !== currentUser) {
        console.log(curUser)
        setCurrentUser(curUser)
      }
    } catch (e) {
      console.log("error log in", e)
    }
    console.log(currentUser)
  }

  // create book
  const createBook = async (newBook) => {
    try {
      await DataStore.save(
        new Book({
          title: newBook.title,
          over18: newBook.ageRating,
          author: newBook.author,
          description: newBook.description,
          numberAvailable: newBook.numberAvailable,
        })
      );
    } catch(e) {
      console.log(e)
    }
  }

  // create user
  const createUser = async (newUser) => {
    setCreatedSignUp(true)
    console.log(newUser)
    let createdUser;
    try {
      createdUser = await Auth.signUp({
          username: newUser.email,
          password: newUser.password,
          attributes: {
            birthdate: newUser.birthdate,
            name: newUser.name,
            email: newUser.email,
          },
      });
    } catch (error) {
        console.log('error signing up:', error);
    }

    console.log(createdUser)


    try {
      await DataStore.save(
        newUser = new User({
          currentBooks: [], fines: [], admin: newUser.admin, birthdate: newUser.birthdate, name: newUser.name, username: newUser.email, email: newUser.email
        })
      );
    } catch(e) {
      console.log(e)
    }


  }

  // delete user
  const deleteUser = async (user) => {
    const client = new CognitoIdentityProviderClient({ region: "REGION" });
    console.log(newUser)
    try {
      await client.adminDelete({
        UserPoolId: "us-west-2_bc4RN7HYt",
        Username: user.email,
      })
    } catch (error) {
        console.log('error deleting user in cognito:', error);
    }
    for (b in bookList) {
      b.userList = b.userList.filter(buser => buser.email != user.email)
    }
    try {
      await DataStore.delete(user)
    } catch (error) {
        console.log('error deleting user in datastore:', error);
    }


  }

  const setAdmin = async () => {
    console.log(currentInfo)
    let newInfo = await DataStore.save(
      User.copyOf(currentInfo, updated => {
        updated.admin = true;
      })
    );
    setCurrentInfo(newInfo)
  }


  Hub.listen('auth', (data) => {     
    console.log('A new event has happened: ', data + ' has ' + data.payload.event);
    if (data.payload.event === 'signIn') {
      console.log("signin")
      setSignIn(true)
      checkLogInState()
    } else if (data.payload.event === 'signUp') {
      console.log("signUp")
      setSignUp(true)
    } else if(data.payload.event === 'signOut') {
      DataStore.clear();
      setSignIn(false)
      setSignOut(true)
    } else if(data.payload.event === 'configured') {
      console.log("configured")
      checkLogInState()
    }
  })

  return (
    <AppContext.Provider value={{setAdmin, currentUser, createUser, deleteUser, showAlert, setShowAlert, currentInfo, currentUser, userData, userList, bookList, adminSignUp}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;