const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/trails/${id}`).then(result => result.json())
      },
      getAll() {
        return fetch(`${remoteURL}/trails`).then(result => result.json())
      },
      delete(id) {
      return fetch(`${remoteURL}/trails/${id}`, {
            method: "DELETE"
        })
        .then(result => result.json())
      }
    }
