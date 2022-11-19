export default function GetAge(birthdate) {
  let now = new Date();

  let currentDate = [
      now.getFullYear(),
      ('0' + (now.getMonth() + 1) ).slice(-2),
      ('0' + now.getDate() ).slice(-2),
  ].join('');

  let pastDate = birthdate.replace('-','');
  return(Math.floor( ( currentDate - pastDate ) * 0.0001 ));
}