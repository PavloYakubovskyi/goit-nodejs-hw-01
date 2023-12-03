const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const readResult = await fs.readFile(contactsPath);
    const arrayContacts = JSON.parse(readResult);
    return arrayContacts;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const foundContactById = contacts.find(
      (contact) => contact.id === contactId
    );
    return foundContactById || null;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const findContactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (findContactIndex < 0) {
      console.log("removeContact:", "контакт з таким id не знайдений");
      return null;
    } else {
      const removeContactById = contacts.splice(findContactIndex, 1)[0];
      return removeContactById;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addContact(name, email, phone) {
  try {
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
