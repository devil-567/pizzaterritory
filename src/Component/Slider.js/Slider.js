
import Carousel from 'react-bootstrap/Carousel';

function Slider() {
  return (
    <div className='slider__' style={{position:"inherit"}}>

    
    <Carousel>
    <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://c4.wallpaperflare.com/wallpaper/234/543/684/food-pizza-wallpaper-preview.jpg"
          alt="First slide"
          style={{width:"100%",height:"400px" ,borderRadius:"10px"}}
        />
        
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg"
          alt="First slide"
          style={{width:"100%",height:"400px" ,borderRadius:"10px"}}
        />
        
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://wallpaperaccess.com/full/866656.jpg"
          alt="Second slide"
          style={{width:"100%",height:"400px" ,borderRadius:"10px"}}

        />
       
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://images7.alphacoders.com/596/thumb-1920-596343.jpg"
          alt="Third slide"
          style={{width:"100%",height:"400px" ,borderRadius:"10px"}}

        />
        
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://c4.wallpaperflare.com/wallpaper/205/168/868/dinner-food-pie-pizza-wallpaper-preview.jpg"
          alt="Third slide"
          style={{width:"100%",height:"400px" ,borderRadius:"10px"}}

        />
        
      </Carousel.Item>
      
    </Carousel>
    </div>
  );
}

export default Slider;