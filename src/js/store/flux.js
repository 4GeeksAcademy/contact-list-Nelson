const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		image:
		  "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png",
		listContacts: { contacts: [] },
	  },
	  actions: {
		createUser: () => {
		  fetch("https://playground.4geeks.com/contact/agendas/agendaNelson", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  accept: "application/json",
			},
			body: JSON.stringify({}),
		  })
			.then((response) => response.json())
			.then((data) => {
			  console.log(data);
			})
			.catch((error) => {
			  console.error("Error:", error);
			});
		},
		createContact: (contact) => {
		  const store = getStore();
		  fetch("https://playground.4geeks.com/contact/agendas/agendaNelson/contacts", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  accept: "application/json",
			},
			body: JSON.stringify(contact),
		  })
			.then((response) => response.json())
			.then((newContact) => {
			  setStore({
				listContacts: [...store.listContacts, newContact],
			  });
			})
			.catch((error) => {
			  console.error("Error:", error);
			});
		},
		fetchContacts: () => {
		  fetch("https://playground.4geeks.com/contact/agendas/agendaNelson/contacts")
			.then((response) => response.json())
			.then((data) => {
			  setStore({ listContacts: data });
			})
			.catch((error) => {
			  console.error("Error:", error);
			});
		},
		editContact: (contactId, updatedContact) => {
		  const store = getStore();
		  fetch(
			`https://playground.4geeks.com/contact/agendas/agendaNelson/contacts/${contactId}`,
			{
			  method: "PUT",
			  headers: {
				"Content-Type": "application/json",
				accept: "application/json",
			  },
			  body: JSON.stringify(updatedContact),
			}
		  )
			.then((response) => response.json())
			.then((updatedContact) => {
			  const updatedContacts = store.listContacts.contacts.map((contact) =>
				contact.id === contactId ? updatedContact : contact
			  );
			  setStore({ listContacts: { contacts: updatedContacts } });
			})
			.catch((error) => {
			  console.error("Error:", error);
			});
		},
		deleteContact: (contactId) => {
		  const store = getStore();
		  fetch(
			`https://playground.4geeks.com/contact/agendas/agendaNelson/contacts/${contactId}`,
			{
			  method: "DELETE",
			  headers: {
				accept: "application/json",
			  },
			}
		  )
			.then((response) => {
			  if (response.ok) {
				const updatedContacts = store.listContacts.contacts.filter(
				  (contact) => contact.id !== contactId
				);
				setStore({ listContacts: { contacts: updatedContacts } });
			  } else {
				console.error("Error deleting contact:", response.statusText);
			  }
			})
			.catch((error) => {
			  console.error("Error:", error);
			});
		},
		deleteAgenda: () => {
			fetch("https://playground.4geeks.com/contact/agendas/agendaNelson", {
			  method: "DELETE",
			  headers: {
				accept: "application/json",
			  },
			})
			  .then((response) => {
				if (response.ok) {
				  // Agenda eliminada correctamente, puedes limpiar el estado si es necesario
				  setStore({
					listContacts: { contacts: [] }, // Limpiar la lista de contactos
				  });
				  console.log("Agenda eliminada correctamente");
				} else {
				  console.error("Error al eliminar la agenda:", response.statusText);
				}
			  })
			  .catch((error) => {
				console.error("Error:", error);
			  });
		  },
	  },
	};
  };
  
  export default getState;
  