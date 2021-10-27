function useActivity() {
  const baseUrl = 'https://todo.api.devcode.gethired.id/activity-groups'

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  }

  const get = async () => {
    const res = await fetch(`${baseUrl}?email=hudadamar21%40gmail.com`)
    return await res.json()
  }

  const create = async (data) => {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })

    return await res.json()
  }

  const remove = async (id) => {
    const res = await fetch(baseUrl + '/' + id, {
      method: 'DELETE',
      headers,
    })
    return await res.json()
  }

  const update = async (id, data) => {
    const res = await fetch(baseUrl + '/' + id, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    })
    return await res.json()
  }

  return {
    get,
    create,
    remove,
    update,
  }
}

export default useActivity
