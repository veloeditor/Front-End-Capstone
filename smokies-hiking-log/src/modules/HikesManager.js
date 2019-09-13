const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/hikes/${id}?_expand=trail`).then(result => result.json())
      },
      getAll() {
        return fetch(`${remoteURL}/hikes?_expand=trail`).then(result => result.json())
      },
      delete(id) {
      return fetch(`${remoteURL}/hikes/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
      },
      post(newHike) {
        return fetch(`${remoteURL}/hikes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newHike)
        }).then(data => data.json())
    },
    update(editedHike) {
      return fetch(`${remoteURL}/hikes/${editedHike.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedHike)
      }).then(data => data.json());
    },
    saveEditedHike(trailObj) {
        return fetch(`${remoteURL}/hikes/${trailObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trailObj)
        }).then(data => data.json());
    }
}