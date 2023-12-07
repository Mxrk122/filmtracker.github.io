import { useState, useEffect } from 'react';

export const useFilter = (firstValue) => {
    const [filter, setFilter] = useState(firstValue);

      const updateFilter = (value) => {
        // Revisar que no se haga una busuqeda de practicamente lo mismo
        const splittedValue = JSON.stringify(value.split(' ').filter(Boolean))
        const splittedFilter = JSON.stringify(filter.split(' ').filter(Boolean))

        if (splittedValue !== splittedFilter && value.length >= 3){
            setFilter(value)
        }
      }

  return { filter, updateFilter };
};


