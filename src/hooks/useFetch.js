import { useEffect, useMemo, useState } from 'react'

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const stableOptions = useMemo(() => options, [JSON.stringify(options)])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(url, { ...stableOptions, signal })
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message || 'An error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [url, stableOptions])

  return { data, loading, error }
}

export default useFetch
