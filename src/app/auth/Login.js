import React from 'react';
import { Store, setUser } from './store';
import { Store as LayoutStore } from '../layout/store';
import { Store as UIStore } from '../ui/store';

import Slider from 'react-slick';
import bg1 from '../../assets/architect/utils/images/originals/city.jpg';
import { Col, Row } from 'reactstrap';

import LoginWidget from './LoginWidget';

export default function Login() {
  const store = React.useContext(Store);
  const uiStore = React.useContext(UIStore);
  const layoutStore = React.useContext(LayoutStore);

  React.useEffect(() => {
    store.dispatch(setUser({}));

    layoutStore.dispatch(
      layoutStore.setState({
        'content.fullPage': true
      })
    );

    return () => {
      layoutStore.dispatch(
        uiStore.setState({
          'content.fullPage': false
        })
      );
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    initialSlide: 0,
    autoplay: true,
    adaptiveHeight: true
  };

  const onLogin = user => {
    store.dispatch(setUser(user));
  };

  let announcement = {};
  if (uiStore.state.announcements) {
    announcement = uiStore.state.announcements[0] || {};
  }

  return (
    <div className="h-100">
      <Row className="h-100 no-gutters">
        {/* <Col lg="4" className="d-none d-lg-block">
          <div className="slider-light">
            <Slider {...settings}>
              <div className="h-100 d-flex justify-content-center align-items-center bg-plum-plate">
                <div
                  className="slide-img-bg"
                  style={{
                    backgroundImage: 'url(' + bg1 + ')',
                  }}
                />
                <div className="slider-content">
                  <h3> {announcement.title} </h3>
                  <p> {announcement.message} </p>
                </div>
              </div>
            </Slider>
          </div>
        </Col> */}
        <Col
          lg="8"
          md="12"
          className="h-100 d-flex bg-white justify-content-center align-items-center"
        >
          <LoginWidget onLogin={onLogin} />
        </Col>
      </Row>
    </div>
  );
}
//password expiration support - self service change password
