import {
  IAscendaCompetitor,
  IAscendaHotel,
  IAscendaMetadata,
} from '../interfaces';
import { AscendaCombinedHotel } from '../types';

/**
 * @description Transform competitors to list
 * @param competitors {Record<string, number> | null | undefined}
 * @returns {IAscendaCompetitor[]}
 * @example
 * const competitors = toListCompetitors({
 *   'Booking.com': 125,
 *   'Hotels.com': 121,
 *   'Expedia': 120,
 *   'getaroom': 140,
 *   'AMOMA.com': 132.77,
 * });
 * console.log(competitors);
 * // => [
 * //   { name: 'Booking.com', price: 125 },
 * //   { name: 'Hotels.com', price: 121 },
 * //   { name: 'Expedia', price: 120 },
 * //   { name: 'getaroom', price: 140 },
 * //   { name: 'AMOMA.com', price: 132.77 },
 * // ]
 */
export const toListCompetitors = (
  competitors?: Record<string, number> | null
): IAscendaCompetitor[] => {
  return Object.entries(competitors ?? {}).map(([name, price]) => ({
    name,
    price,
  }));
};

/**
 * @description Calculate saving
 * @param original {number}
 * @param competitor {number}
 * @returns {number} Saving percentage
 * @example
 * calculateSaving(123, 100); // 12
 */
export const calculateSaving = (
  original: number,
  competitor: number
): number => {
  const saving = Number(
    (((original - competitor) / original) * 100).toFixed(1)
  );

  return saving > 0 ? saving : 0;
};

/**
 * @description Combine hotels and metadata
 * @param hotels {IAscendaHotel[]}
 * @param metadata {IAscendaMetadata[]}
 * @returns {AscendaCombinedHotel[]}
 * @example
 * combineHotels([
 *   {
 *     id: 1,
 *     name: 'Hotel A',
 *     description: '<p>Hello World</p>',
 *     rating: 5,
 *     stars: 4,
 *     address: 'Address 1',
 *     photo: 'photo.jpg',
 *   },
 *   {
 *     id: 2,
 *     name: 'Hotel B',
 *     description: '<p>Hello World</p>',
 *     rating: 5,
 *     stars: 4,
 *     address: 'Address 2',
 *     photo: 'photo.jpg',
 *   },
 * ], [
 *   {
 *     id: 1,
 *     price: 100,
 *   },
 *   {
 *     id: 2,
 *   },
 * ]);
 * // => [
 * //   {
 * //     id: 1,
 * //     name: 'Hotel A',
 * //     description: '<p>Hello World</p>',
 * //     rating: 5,
 * //     stars: 4,
 * //     address: 'Address 1',
 * //     photo: 'photo.jpg',
 * //     price: 100,
 * //   },
 * //   {
 * //     id: 2,
 * //     name: 'Hotel B',
 * //     description: '<p>Hello World</p>',
 * //     rating: 5,
 * //     stars: 4,
 * //     address: 'Address 2',
 * //     photo: 'photo.jpg',
 * //   },
 * // ]
 */
export const combineHotels = (
  hotels: IAscendaHotel[],
  metadata: IAscendaMetadata[]
): AscendaCombinedHotel[] => {
  return hotels
    .map(
      hotel =>
        ({
          ...hotel,
          ...metadata.find(metadata => metadata.id === hotel.id),
        }) as AscendaCombinedHotel
    )
    .sort(a => {
      if (!a.price) {
        return 1;
      }

      return 0;
    });
};
