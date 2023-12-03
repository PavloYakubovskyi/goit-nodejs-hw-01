const fs = require("fs").promises;
const path = require("path");

// const contactsPath = path.resolve("db/contacts.json");
// const contactsPath = path.join("db", "contacts.json");
const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    // ...твій код. Повертає масив контактів.
    const readResult = await fs.readFile(contactsPath);
    // console.log(readResult);
    const arrayContacts = JSON.parse(readResult);
    // const arrayContacts = readResult.toString();
    // console.log("listContacts:", arrayContacts);
    return arrayContacts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();

    const foundContactById = contacts.find(
      (contact) => contact.id === contactId
    );
    // console.log("foundContactById:", foundContactById || null);
    return foundContactById || null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
// getContactById("rsKkOQUi80UsgVPCcLZZW");

async function removeContact(contactId) {
  try {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts();

    const findContactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (findContactIndex < 0) {
      console.log("removeContact:", "контакт з таким id не знайдений");
      return null;
    } else {
      const removeContactById = contacts.splice(findContactIndex, 1)[0];
      // console.log("removeContact:", removeContactById);
      return removeContactById;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
// removeContact("rsKkOQUi80UsgVPCcLZZW");

async function addContact(name, email, phone) {
  try {
    // ...твій код. Повертає об'єкт доданого контакту.
    const contacts = await listContacts();

    const newContactId = Date.now().toString();

    const newContact = {
      id: newContactId,
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    console.log("addContact:", newContact);
    return newContact;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
// addContact("Pavlo", "abec", "555");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// console.log(global);
// console.log(__dirname);
// console.log(__filename);

// різниця контекст, в стрілочній не має this 1:03
// const contactsPath = () => console.log("HI");
// functions експрешин, обявити можна тільки піся бо тут є const
// const contactsPath = function () {
//   console.log("HI");
// };
// functions declarations, можемо викликати до того як обявили
// function contactsPath(params) {}

// (async () => {
//   console.log("TEST");
// })();
