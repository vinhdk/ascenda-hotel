import { IAscendaHotel, IAscendaMetadata } from '../interfaces';
import {
  calculateSaving,
  combineHotels,
  toListCompetitors,
} from './competitor';

describe('[Function toListCompetitors]', () => {
  it('Happy case', () => {
    const competitors = {
      'Booking.com': 125,
      'Hotels.com': 121,
      Expedia: 120,
      getaroom: 140,
      'AMOMA.com': 132.77,
    };

    expect(toListCompetitors(competitors)).toEqual([
      { name: 'Booking.com', price: 125 },
      { name: 'Hotels.com', price: 121 },
      { name: 'Expedia', price: 120 },
      { name: 'getaroom', price: 140 },
      { name: 'AMOMA.com', price: 132.77 },
    ]);
  });

  it('Empty case', () => {
    const competitors = {};

    expect(toListCompetitors(competitors)).toEqual([]);
  });

  it('Null case', () => {
    const competitors = null;

    expect(toListCompetitors(competitors)).toEqual([]);
  });
});

describe('[Function calculateSaving]', () => {
  it('Happy case', () => {
    expect(calculateSaving(100, 123)).toBe(18.7);
  });

  it('Negative case', () => {
    expect(calculateSaving(123, 100)).toBe(0);
  });

  it('Zero case', () => {
    expect(calculateSaving(100, 100)).toBe(0);
  });
});

describe('[Function combineHotels]', () => {
  it('Happy case', () => {
    const hotels: IAscendaHotel[] = [
      {
        id: 1,
        name: 'Hotel A',
        description: '<p>Hello World</p>',
        rating: 5,
        stars: 4,
        address: 'Address 1',
        photo: 'photo.jpg',
      },
      {
        id: 2,
        name: 'Hotel B',
        description: '<p>Hello World</p>',
        rating: 5,
        stars: 4,
        address: 'Address 2',
        photo: 'photo.jpg',
      },
    ];
    const metadata = [
      {
        id: 1,
        price: 100,
      },
      {
        id: 2,
      },
    ] as IAscendaMetadata[];

    expect(combineHotels(hotels, metadata)).toEqual([
      {
        id: 1,
        name: 'Hotel A',
        description: '<p>Hello World</p>',
        rating: 5,
        stars: 4,
        address: 'Address 1',
        photo: 'photo.jpg',
        price: 100,
      },
      {
        id: 2,
        name: 'Hotel B',
        description: '<p>Hello World</p>',
        rating: 5,
        stars: 4,
        address: 'Address 2',
        photo: 'photo.jpg',
      },
    ]);
  });

  it('Zero case', () => {
    const hotels: IAscendaHotel[] = [
      {
        id: 1,
        name: 'Hotel A',
        description: '<p>Hello World</p>',
        rating: 5,
        stars: 4,
        address: 'Address 1',
        photo: 'photo.jpg',
      },
      {
        id: 2,
        name: 'Hotel B',
        description: '<p>Hello World</p>',
        rating: 5,
        stars: 4,
        address: 'Address 2',
        photo: 'photo.jpg',
      },
    ];
    const metadata = [
      {
        id: 1,
        price: 100,
      },
      {
        id: 2,
        price: 5,
      },
    ] as IAscendaMetadata[];

    expect(combineHotels(hotels, metadata)).toEqual([
      {
        id: 1,
        name: 'Hotel A',
        description: '<p>Hello World</p>',
        rating: 5,
        stars: 4,
        address: 'Address 1',
        photo: 'photo.jpg',
        price: 100,
      },
      {
        id: 2,
        name: 'Hotel B',
        description: '<p>Hello World</p>',
        rating: 5,
        stars: 4,
        address: 'Address 2',
        photo: 'photo.jpg',
        price: 5,
      },
    ]);
  });

  it('Empty case', () => {
    const hotels: IAscendaHotel[] = [];
    const metadata = [
      {
        id: 1,
        price: 100,
      },
      {
        id: 2,
      },
    ] as IAscendaMetadata[];

    expect(combineHotels(hotels, metadata)).toEqual([]);
  });
});
