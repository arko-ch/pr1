import avatar1 from '../../../assets/architect/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/architect/utils/images/avatars/2.jpg';
import moment from 'moment';

export const avatars = [{ src: avatar1 }, { src: avatar2 }];
export const avatar = avatar1;
export const emails = [
  {
    sender: 'Richard Pormero',
    title: 'Example Email',
    day: 1,
    hour: 2,
    avatars
  }
  /*  {
    sender: 'Richard Pormero',
    title: 'Example Email 2',
    day: 5,
    hour: 3,
    avatars
  },
  {
    sender: 'Cameron Williamson',
    title: 'Example Email 3',
    day: 2,
    hour: 6,
    avatars
  },
  {
    sender: 'Cameron Williamson',
    title: 'Example Email 4',
    day: 7,
    hour: 1,
    avatars
  } */
];

export const handleConvertDate = date => {
  return moment(date)
    .startOf('day')
    .fromNow();
};
