const Footer = () => {
  return (
    <footer className='footer'>
      <a
        className='footer__link'
        href='https://developers.giphy.com/'
        aria-label='GIPHY Developers'
        target='_blank'
      >
        <img
          className='footer__image'
          src='http://www.georgewpark.com/images/codepen/giphy-attribution.png'
          alt='Powered By GIPHY'
        />
      </a>
    </footer>
  )
}

export default Footer
