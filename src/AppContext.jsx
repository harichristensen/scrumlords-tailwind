
import { createContext, useState, useEffect } from 'react';
import { User, Book } from './models';
import { Auth, DataStore, Hub } from 'aws-amplify';
import { useRouter } from 'next/router';
import { CognitoIdentityProviderClient } from '@aws-sdk/client-cognito-identity-provider';




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
  const [signIn, setSignIn] = useState('');
  const [notParsed, setNotParsed] = useState('');
  const [usersNotParsed, setUsersNotParsed] = useState('');
  const [booksNotParsed, setBooksNotParsed] = useState('');
  const [infoNotParsed, setInfoNotParsed] = useState('');
  const [signOut, setSignOut] = useState('');
  const [adminSignUp, setAdminSignUp] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [createUserValue, setCreateUserValue] = useState("");

  const router = useRouter()

  // authentication states
  useEffect(() => {
      checkLogInState()
    }, [signIn]);
  
  useEffect(() => {
    if (signOut === true){
      router.reload()
    }
  }, [signOut]);

  useEffect(() => {
    console.log(signUp)
    if (signUp === true){
      const createUserInfo = async () => {
        console.log("hello")
        try {
          await DataStore.save(
            newUser = new UserInfo({
              currentBooks: {}, bookHistory: {}, fines: {}, admin: false
            })
          );
        } catch(e) {
          console.log(e)
        }
      }
      createUserInfo();
      setShowAlert(true);
    }
  }, [signUp]);


  // update user
  useEffect(() => {
    console.log(signIn)
    if (signIn === true){
      loadBooks();
      loadUsers();
      
      const bookSubscription = DataStore.observe(BookInfo).subscribe(() => {loadBooks()})
      const userSubscription = DataStore.observe(UserInfo).subscribe(() => {loadUsers()})

      const unsub = () => {
        bookSubscription.unsubscribe();
        userSubscription.unsubscribe();
      }
      return () => unsub()
    }
  }, [currentUser]);

  // update user list and book list
  useEffect(() => {
    if (booksNotParsed && booksNotParsed.length !== 0){
      const parsedBooks = JSON.parse(JSON.stringify(booksNotParsed))
      setBookList(parsedBooks)
    }
  }, [booksNotParsed]);

  useEffect(() => {
    if (usersNotParsed && usersNotParsed.length !== 0){
      const parsedUsers = JSON.parse(JSON.stringify(usersNotParsed))
      setUserList(parsedUsers)
    }
  }, [usersNotParsed]);

  const loadBooks = async () => {
    let bookList = await DataStore.query(BookInfo);
    setBooksNotParsed(bookList)
  }

  const loadUsers = async () => {
    let userList = await DataStore.query(UserInfo);
    setUsersNotParsed(userList)
  }


  // check if user has changed sign in/sign out
  const checkLogInState = async () => {
    let curUser;
    try {
      curUser = await Auth.currentAuthenticatedUser()
      if (curUser != currentUser) {
        setCurrentUser(curUser)
      }
    } catch (e) {
      console.log("error log in", e)
      setCurrentUser(null)
    }
    console.log(curUser)
  }

  // create book
  const createBook = async (newBookInfo) => {
    let newBook
    
    try {
      newBook = await DataStore.save(
        new BookInfo({
          title: newBookInfo.title,
          over18: newBookInfo.ageRating,
          author: newBookInfo.author,
          description: newBookInfo.description,
          numberAvailable: newBookInfo.numberAvailable,
        })
      );
    } catch(e) {
      console.log(e)
    }
  }

  // create user
  const createUser = async (newUserInfo) => {
    console.log(newUserInfo)
    let newUser;
    try {
      newUser = await Auth.signUp({
          username: newUserInfo.email,
          password: newUserInfo.password,
          attributes: {
            age: newUserInfo.email,
            firstName: newUserInfo.firstName,
            lastName: newUserInfo.lastName,
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
              enabled: true,
          }
      });
    } catch (error) {
        console.log('error signing up:', error);
    }


    try {
      await DataStore.save(
        newUser = new User({
          email: newUserInfo.email, firstName: newUserInfo.firstName, lastName: newUserInfo.lastName, currentBooks: [], fines: [], admin: newUserInfo.admin, accountId: newUser, age: newUserInfo.age
        })
      );
    } catch(e) {
      console.log(e)
    }
  }

  // delete user
  const deleteUser = async (user) => {
    const client = new CognitoIdentityProviderClient({ region: "REGION" });
    console.log(newUserInfo)
    let newUser;
    try {
      client.admin
      newUser = await Auth.deleteUser({
          username: newUserInfo.email,
          password: newUserInfo.password,
          attributes: {
            age: newUserInfo.email,
            firstName: newUserInfo.firstName,
            lastName: newUserInfo.lastName,
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
              enabled: true,
          }
      });
    } catch (error) {
        console.log('error signing up:', error);
    }


    try {
      await DataStore.save(
        newUser = new User({
          email: newUserInfo.email, firstName: newUserInfo.firstName, lastName: newUserInfo.lastName, currentBooks: [], fines: [], admin: newUserInfo.admin, accountId: newUser, age: newUserInfo.age
        })
      );
    } catch(e) {
      console.log(e)
    }
  }

  // set user as admin
  const setAdmin = async () => {

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
    <AppContext.Provider value={{setAdmin, showAlert, setShowAlert, currentSelf, currentUser, userData, userList, bookList, adminSignUp, createBook, setAdminSignUp}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;