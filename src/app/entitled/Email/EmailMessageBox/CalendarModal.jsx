import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  CalendarGreet,
  CalendarDescription,
  EmailGrayButton,
  EmailBlueButton,
  CalendarTextarea,
  CalendarBodyContainer
} from '../StyledComponents';
import { Row, Col, Modal, ModalBody } from 'reactstrap';

const CalendarModal = ({ open, handleClose, className }) => {
  return (
    <Modal isOpen={open} toggle={handleClose} className={className}>
      <ModalBody>
        <CalendarBodyContainer>
          <Col md={5} className="p-5 calendar-greeting-container">
            <CalendarGreet>Have a good day, Bryan</CalendarGreet>
            <CalendarDescription>
              Do you want to remind yourself of anything tomorrow?
            </CalendarDescription>
            <Row>
              <CalendarTextarea />
            </Row>
            <Row className="justify-content-end">
              <EmailGrayButton>Cancel</EmailGrayButton>
              <EmailBlueButton className="ml-1">
                I’m taking time off
              </EmailBlueButton>
            </Row>
          </Col>
          <Col md={7} className="p-4 calendar-inner-container">
            <CalendarGreet>You have 3 more closings this week.</CalendarGreet>
            <Calendar />
          </Col>
        </CalendarBodyContainer>
      </ModalBody>
    </Modal>
  );
};
export default CalendarModal;
