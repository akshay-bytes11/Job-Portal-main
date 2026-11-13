import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
            "Data Scientist",
            "Data Engineer",
            "Business Analyst",
            "Machine Learning",
            "DevOps Engineer"
        ]
    },
    {
        filterType: "Salary",
        array: ["0-6 LPA", "6-12 LPA", "12-25 LPA", "25+ LPA"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        if (selectedValue === value) {
            setSelectedValue('');
        } else {
            setSelectedValue(value);
        }
    }

    const clearFilterHandler = () => {
        setSelectedValue('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-4 rounded-md shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                {selectedValue && (
                    <button
                        onClick={clearFilterHandler}
                        className='text-xs font-semibold text-red-500 hover:text-red-700 transition-colors'
                    >
                        Clear Filter
                    </button>
                )}
            </div>
            <hr className='mt-3 mb-2' />
            {
                filterData.map((data, index) => (
                    <div key={`filter-${index}`} className='mt-3'>
                        <h2 className='font-semibold text-sm text-gray-700 uppercase tracking-wide'>{data.filterType}</h2>
                        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2 cursor-pointer' key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId} className='cursor-pointer text-sm text-gray-600 font-normal hover:text-black'>
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })
                            }
                        </RadioGroup>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterCard