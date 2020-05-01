import React from 'react'
import { Tour } from '../component/Tour'
import { useSelector } from 'react-redux'

const ToursPage = () => {
    const tours = useSelector(state => state.tours.tours)

    return (
        <div>
            {tours.map((tour) => (
              <Tour key={tour.id} tour={tour} />
            ))}
        </div>
    )
}

export default ToursPage