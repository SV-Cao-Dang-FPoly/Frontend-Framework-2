import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IRoom } from 'src/app/interfaces/Room';
import { RoomService } from 'src/app/services/room.service';
import { BookingroomService } from './../../services/bookingroom.service';

const BookingRoomComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roomId, setRoomId] = useState('');
  const [hasUserInfo, setHasUserInfo] = useState(false);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [checkInDate, setCheckInDate] = useState<any>(null);
  const [checkOutDate, setCheckOutDate] = useState<any>(null);
  const [numberOfGuests, setNumberOfGuests] = useState<any>(null);
  
  const roomService = new RoomService();
  const bookingService = new BookingroomService();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    setName(storedName || '');
    setEmail(storedEmail || '');
    setHasUserInfo(storedName ? true : false);

    roomService.getRoomById(id).then((data: any) => {
      setRooms([data.room]);
      console.log(data.room);
    });
  }, [id]);

  const bookRoom = () => {
    const nameValue = document.querySelector('.text-black')?.textContent || '';
    const emailValue = document.querySelector('.email')?.textContent || '';

    const checkInValue = (
      document.querySelector('input[type=datetime-local]') as HTMLInputElement
    )?.value || '';
    const checkOutValue = (
      document.querySelector('input[type=datetime-local]') as HTMLInputElement
    )?.value || '';
    const numberOfGuestsValue = (
      document.querySelector('input[type=number]') as HTMLInputElement
    )?.value || '';

    setName(nameValue.trim());
    setEmail(emailValue);
    setCheckInDate(new Date(checkInValue));
    setCheckOutDate(new Date(checkOutValue));
    setNumberOfGuests(parseInt(numberOfGuestsValue, 10) || 0);

    const bookingData = {
      name: name,
      email: email,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numberOfGuests: numberOfGuests,
      roomName: rooms[0].name,
      roomId: rooms[0]._id,
    };

    bookingService.BookigRoom(bookingData).then(
      (response) => {
        console.log('Đặt phòng thành công:', response);
        alert('Đặt Phòng Thành Công !');
        history.push('/history');
      },
      (error) => {
        console.error('Lỗi khi đặt phòng:', error);
      }
    );
  };

  return (
    // JSX code for the booking room component
  );
};

export default BookingRoomComponent;
