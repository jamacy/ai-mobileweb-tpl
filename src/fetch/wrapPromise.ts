enum Status {
  SUCESS = 'success',
  PENDING = 'pending',
  ERROR = 'error',
}

const wrapPromise = (pr: Promise<Array<Object>>) => {
  let status = Status.PENDING
  let result: any
  const suspender = pr
    .then((res) => {
      status = Status.SUCESS
      result = res
    })
    .catch((err) => {
      status = Status.ERROR
      result = err
    })

  const read = () => {
    if (status === Status.PENDING) throw suspender
    if (status === Status.ERROR) throw result
    return result
  }

  return { read }
}
export default wrapPromise
