const AboutHeader = ({ data }) => {
  const { headline, tagLine } = data
  return (
    <div className='w-full pb-10'>
      <h1 className='text-4xl font-semibold max-lg:text-center'>{headline}</h1>
      <p className='mt-4 text-lg text-gray-600'>{tagLine}</p>
    </div>
  )
}

export default AboutHeader
