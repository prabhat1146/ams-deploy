import React, { useEffect, useState } from 'react';

const FacultyProfile = (props) => {
    const BASEURL = process.env.REACT_APP_BASEURL;
    const [facultyCourse, setFacultyCourse] = useState();
    useEffect(() => {
        const url = `${BASEURL}/attendance/attendanceTotalData?facultyEmail=sunny.mallick21b@iiitg.ac.in`
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    console.log(res)
                    if (res) {
                        return res.json();
                    } else {
                        return []
                    }
                }
            })
            .then((res) => {
                const courses = res?.map((course) => {
                    return (
                        [course.courseID, course.courseName]
                    )
                })
                setFacultyCourse((new Map(courses)))
                // console.log(new Set(res))
                // console.log(courses)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [BASEURL])
    return (
        <div className='mt-8 w-full flex justify-center items-center'>
            <div className='w-1/2 bg-white p-4 rounded-md'>
                {facultyCourse &&
                    Array.from(facultyCourse.entries()).map(([key, value], index) => (
                        <div key={index}>
                            {/* Render your course information here using {key} and {value} */}
                            <div>
                                <h1> {value} ( {key} )</h1>
                                
                            </div>
                        </div>
                    ))}
            </div>

        </div>
    );
};

export default FacultyProfile;