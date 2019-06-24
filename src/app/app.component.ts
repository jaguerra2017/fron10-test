import { FlightClass } from './../models/flight_class';
import { FlightType } from './../models/flight_types';
import { Component, OnInit } from '@angular/core';
import { PassengerType } from 'src/models/passenger_type';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fron10';
  totalPassengers = 1;
  pasajeros = '1 Adulto';
  selectedPassengerCode = 'adulto';
  flightTypes: FlightType[] = [
    {
      code: 'ida_vuelta',
      name: 'Ida y Vuelta'
    },
    {
      code: 'ida',
      name: 'Solo Ida'
    },
    {
      code: 'multidestino',
      name: 'Multidestino'
    }
  ];

  flightClasses: FlightClass[] = [
    {
      code: 'economica',
      name: 'Económica'
    },
    {
      code: 'primera',
      name: 'Primera'
    },
    {
      code: 'ejecutiva',
      name: 'Ejecutiva'
    }
  ];

  passengerTypes: PassengerType[] = [
    {
      name: 'Adultos',
      code: 'adulto',
      quantity: 1,
      ageRange: '',
      nameSingular: 'Adulto'
    },
    {
      name: 'Jóvenes',
      code: 'jovenes',
      quantity: 0,
      ageRange: '12 a 17',
      nameSingular: 'Jóven'
    },
    {
      name: 'Niños',
      code: 'childs',
      quantity: 0,
      ageRange: '2 a 11',
      nameSingular: 'Niño'
    }
  ];

  serachForm = new FormGroup({
    selectedFlightType: new FormControl('ida', Validators.required),
    selectedFlightClass: new FormControl('economica', Validators.required),
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    selectedGoDate: new FormControl(new Date(), Validators.required),
    selectedReturnDate: new FormControl(new Date(), Validators.required),
  });

  ngOnInit(): void {

  }

  decreaseQuantity(passengerType: PassengerType): void {
    if (passengerType.quantity > 0 && this.totalPassengers > 1) {
      passengerType.quantity = passengerType.quantity - 1;
      this.totalPassengers --;
    }
  }

  increaseQuantity(passengerType: PassengerType): void {
    passengerType.quantity = passengerType.quantity + 1;
    this.totalPassengers ++;
  }

  getPassengersSearchString(): string {
    let showedPassengerName = '';
    let isPositiveCount = false;
    let differents = false;
    for (let passengerType of this.passengerTypes) {
        if (passengerType.quantity > 0 && isPositiveCount === false) {
          isPositiveCount = true;
          showedPassengerName = passengerType.quantity === 1 ? passengerType.nameSingular : passengerType.name;
          this.selectedPassengerCode = passengerType.code;
        } else if (passengerType.quantity > 0) {
          differents = true;
          this.selectedPassengerCode = 'pasajero';
        }
    }

    if (differents === false) {
      return this.totalPassengers + ' ' + showedPassengerName;
    } else {
      return this.totalPassengers + ' pasajeros';
    }
  }

  triggerSearch(): void {
    if (this.serachForm.status === 'VALID') {
      alert(JSON.stringify(this.serachForm.value));
    } else {
      alert('El formulario no es válido');
    }
  }
}
