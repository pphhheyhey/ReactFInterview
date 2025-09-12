// utils/request.js
// 本地存储模拟请求封装

const STORAGE_KEY = 'contacts';

export function getContacts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getContactById(id) {
  const contacts = getContacts();
  return contacts.find(c => c.id === id);
}

export function saveContact(contact) {
  const contacts = getContacts();
  const idx = contacts.findIndex(c => c.id === contact.id);
  if (idx > -1) {
    contacts[idx] = contact;
  } else {
    contacts.push(contact);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export function deleteContact(id) {
  let contacts = getContacts();
  contacts = contacts.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
}

export function clearContacts() {
  localStorage.removeItem(STORAGE_KEY);
}
