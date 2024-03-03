// src/components/EditOptions.jsx
import React, { useState } from 'react';
import { fetchData } from './SetFormData';
import CourseList from './CourseList';
import FacultyList from './FacultyList';
import { useEffect, useCallback } from 'react';
import StudentDashboard from '../student/StudentDashBoard';
import StudentList from './StudentList';
import UploadCourses from './UploadCourses'
import UploadAllFaculty from './UploadAllFaculty';


const EditOptions = ({ section }) => {
  const [facultyData, setFacultyData] = useState({});
  const [gender, setGender] = useState('');
  const [viewAllFaculty, setViewAllFaculty] = useState(false);
  const [allFaculty, setFaculty] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [courses, setCourses] = useState([]);
  const [viewAllcourses, setViewAllCourses] = useState(false);
  const [sectionSelected, setSectionSelected] = useState();
  const [groupSelected, setGroupSelected] = useState();
  const [semesterValue, setSemesterValue] = useState(1);
  const [viewAllStudents, setViewAllStudents] = useState(false);
  const [allStudents, setAllStudents] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState(
    [
      {
        courseID: '',
        courseName: ''
      }
    ]
  );


  const [studentData, setStudentData] = useState({
    studentName: '',
    studentRoll: '',
    studentEmail: '',
    studentDepartment: '',
    studentDegree: '',
    studentAdmisionYear: '',
    studentPhone: '',
    studentPassword: '',

    studentCourse: [
      {
        semester: 0,
        courses: [
          {
            courseID: '',
            courseName: '',
            penalty: 0,
          },
        ],
        studentGroup: '',
        studentSection: '',
      },
    ],

  });


  const BASEURL = process.env.REACT_APP_BASEURL
  // console.log(BASEURL)

  useEffect(() => {
    setStudentData((prevStudentData) => ({
      ...prevStudentData,
      studentCourse: [
        {
          semester: semesterValue,
          courses: selectedCourses,
          studentGroup: groupSelected,
          studentSection: sectionSelected
        },
      ],
    }));
    // console.log(studentData)
  }, [groupSelected, sectionSelected, selectedCourses, semesterValue]);


  useEffect(() => {
    const url = `${BASEURL}/course/find`;
    // console.log(BASEURL, url)
    try {
      fetch(url)
        .then((res) => {
          // Check if the response is successful
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          // Parse the JSON response
          return res.json();
        })
        .then((data) => {

          const uniqueCourses = data.map((item) => ({
            courseName: item.courseName + " ( " + item.courseID + " )",
            courseID: item.courseID,
          }));

          setAllCourses([...new Set(uniqueCourses)]);


        })
        .catch((error) => {
          // Handle fetch or parsing errors
          console.error('Error fetching courses:', error);
        });
    } catch (error) {

    }
  }, [BASEURL])





  const handleFacultyChange = (e) => {
    const { name, value } = e.target;
    setFacultyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleAddFaculty = (e) => {
    e.preventDefault();
    const url = `${BASEURL}/faculty/add`;
    try {
      fetchData(url, facultyData, "Added", true);

    } catch (error) {

    }
  };

  const handleUpdateFaculty = (e) => {
    e.preventDefault();
    const url = `${BASEURL}/faculty/update`;
    try {
      fetchData(url, facultyData, "updated", true);

    } catch (error) {

    }
  };

  const handleRemoveFaculty = (e) => {
    e.preventDefault();
    const url = `${BASEURL}/faculty/remove`;
    try {
      fetchData(url, facultyData, "Removed", true);

    } catch (error) {

    }
  };

  const handleViewAllFaculty = (e) => {
    setViewAllFaculty(!viewAllFaculty)
  }


  //student

  const handleStudent = (e) => {
    const { name, value } = e.target;
    if (name === "semester") {

      if (value < 1) {
        setSemesterValue(1)
      } else if (value > 8) {
        setSemesterValue(8)
      } else {
        setSemesterValue(value)
      }

    }
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleAddStudent = (e) => {
    e.preventDefault();
    const url = `${BASEURL}/student/add`;
    try {
      fetchData(url, studentData, "Added", true);

    } catch (error) {

    }
  }
  const handleRemoveStudent = (e) => {
    e.preventDefault();
    const url = `${BASEURL}/student/remove`;
    try {
      fetchData(url, studentData, "Removed", true);

    } catch (error) {

    }
  }
  const handleUpdateStudent = (e) => {
    e.preventDefault();
    const url = `${BASEURL}/student/update`;
    try {
      fetchData(url, studentData, "updated", true);

    } catch (error) {

    }
  }

  const handleViewAllStudents = () => {
    setViewAllStudents(!viewAllStudents)
  };


  useEffect(() => {

    const dep = `studentDepartment=${studentData.studentDepartment}`
    const roll = `studentRoll=${studentData.studentRoll}`
    const deg = `studentDegree=${studentData.studentDegree}`

    const url = `${BASEURL}/student/find?${dep}&${deg}&${roll}`


    try {
      fetch(url)
        .then((res) => {
          // Check if the response is successful
          if (!res.ok) {
            // throw new Error(`HTTP error! Status: ${res.status}`);
          }
          // Parse the JSON response
          return res.json();
        })
        .then((data) => {
          // Assuming the response is an array of courses
          // Update the state with the fetched courses
          if (data == null) {
            setAllStudents([])
            // console.log(data,'jii')
          }
          else {
            setAllStudents(data);
            // console.log(data,'hiii')
          }
          console.log(data)
        })
        .catch((error) => {
          // Handle fetch or parsing errors
          console.error('Error fetching courses:', error);
        });
    } catch (error) {

    }

  }, [studentData.studentDegree, studentData.studentDepartment, studentData.studentRoll]);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is "semester" and the value is a number
    if (name === "semester") {
      // Convert the value to a number and ensure it's within the range 1 to 8
      // alert(value)
      if (value < 1) {
        setSemesterValue(1)
      } else if (value > 8) {
        setSemesterValue(8)
      } else {
        setSemesterValue(value)
      }

      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // For other fields or non-numeric values, set the value directly
      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };



  useEffect(() => {

    const url = `${BASEURL}/faculty/find`;
    try {
      fetch(url)
        .then((res) => {
          // Check if the response is successful
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          // Parse the JSON response
          return res.json();
        })
        .then((data) => {
          // Assuming the response is an array of courses
          // Update the state with the fetched courses
          setFaculty(data);
        })
        .catch((error) => {
          // Handle fetch or parsing errors
          console.error('Error fetching courses:', error);
        });
    } catch (error) {

    }

  }, [BASEURL, allFaculty]);


  

  const handleAddCourse = useCallback((e) => {
    e.preventDefault();
    const url = `${BASEURL}/course/add`;
    try {
      // console.log(courseData)
      fetchData(url, courseData, "Added", true);
    } catch (error) {

    }
  }, [BASEURL, courseData]);


  const handleUpdateCourse = useCallback((e) => {
    e.preventDefault();
    const url = `${BASEURL}/course/update`;
    try {
      // console.log(courseData)
      fetchData(url, courseData, "updated", true);
    } catch (error) {
      console.log(error)

    }
  }, [BASEURL, courseData]);

  const handleRemoveCourse = useCallback((e) => {
    e.preventDefault();
    const url = `${BASEURL}/course/remove`;
    try {
      // console.log(courseData)
      fetchData(url, courseData, "Removed", true);
    } catch (error) {
      console.log(error)
    }
  }, [BASEURL, courseData]);


  const handleAllCourse = (e) => {
    setViewAllCourses(!viewAllcourses)
  }
  const renderAdmissionYearOptions = () => {
    const yearOptions = [];
    for (let year = 2013; year <= 2024; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return yearOptions;
  };

  useEffect(() => {

    const url = `${BASEURL}/course/find`;
    try {
      fetch(url)
        .then((res) => {
          // Check if the response is successful
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          // Parse the JSON response
          return res.json();
        })
        .then((data) => {
          // Assuming the response is an array of courses
          // Update the state with the fetched courses
          setCourses(data);
        })
        .catch((error) => {
          // Handle fetch or parsing errors
          console.error('Error fetching courses:', error);
        });
    } catch (error) {
      console.log(error)
    }

  }, [courses, handleAddCourse, handleRemoveCourse, handleUpdateCourse, setCourseData]);

  // const handleRemoveSelectedCourse = (index) => {
  //   // Create a new array without the course at the specified index
  //   const updatedCourses = [...selectedCourses.courseID.slice(0, index), ...selectedCourses.courseID.slice(index + 1)];
  //   setSelectedCourses({ ...selectedCourses, courseID: updatedCourses });
  // };



  const handleRemoveSelectedCourse = (index) => {
    // Create a new array without the course at the specified index
    const updatedCourses = [...selectedCourses.slice(0, index), ...selectedCourses.slice(index + 1)];
    setSelectedCourses(updatedCourses);
  };

  const handleCourseSelection = (e, semesterIndex) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => JSON.parse(option.value));

    // Check if the selected options are not already in the selectedCourses array
    const newSelectedCourses = selectedOptions.filter(option =>
      !selectedCourses.some(course => course.courseID === option.courseID)
    );

    // Update selectedCourses with the new courses
    setSelectedCourses((prevSelectedCourses) => [
      ...prevSelectedCourses,
      ...newSelectedCourses
    ]);

  };

  return (
    // <div className='w-11/12 flex flex-col items-center'>
    <div className="w-11/12 ">
      {section === 'faculty' && (
        <div className='flex flex-col items-center w-full '>
          <h2 className="text-xl font-bold mb-4">Faculty Management</h2>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col ">
            <label className="block text-sm mb-1 ">Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleFacultyChange}
              placeholder="Enter name"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleFacultyChange}
              placeholder="Enter email"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-4 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender*
            </label>
            <div className="flex space-x-4 ">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="male"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={() => setGender('Male')}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="female"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={() => setGender('Female')}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="nota"
                  value="NOTA"
                  checked={gender === 'NOTA'}
                  onChange={() => setGender('NOTA')}
                  className="form-radio h-5 w-5 text-blue-500"
                />
                <span className="ml-2">Third Gender</span>
              </label>
            </div>
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Phone:</label>
            <input
              type="Number"
              name="phone"
              onChange={handleFacultyChange}
              placeholder="Enter phone"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1 ">Department:</label>
            <select
              name="department"
              onChange={handleFacultyChange}
              placeholder="Select department"
              className="p-2 border block "
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science and Engineering(CSE)</option>
              <option value="ECE">Electronics and Communication Engineering(ECE)</option>
              <option value="MATHS">Maths & Science</option>
              <option value="HSS"> Humanities and Social Sciences (HSS)</option>
              {/* <option value="science">Science</option> */}
            </select>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <button onClick={handleAddFaculty} className="bg-green-500 text-white hover:bg-green-700 p-2  rounded-md m-2">
              Add Faculty
            </button>
            <button onClick={handleUpdateFaculty} className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md m-2">
              Update Faculty
            </button>
            <button onClick={handleRemoveFaculty} className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md m-2">
              Update Email
            </button>
            <button onClick={handleRemoveFaculty} className="bg-red-500 text-white hover:bg-red-700 p-2 px-5 rounded-md m-2">
              Remove
            </button>
            <button onClick={handleViewAllFaculty} className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md mb-2 m-2">
              View  Faculty
            </button>
          </div>
          {/* <SetFormData/> */}
          {/* <div className="mb-2">
            <label className="block text-sm mb-1">Email to Remove Faculty:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter email to remove"
              className="p-2 border block w-full"
            />
          </div> */}


          {viewAllFaculty &&
            <FacultyList faculty={allFaculty} />}

          <UploadAllFaculty />
        </div>
      )}

      {section === 'student' && (
        <div className='flex flex-col items-center w-full'>
          <h2 className="text-xl font-bold mb-4">Student Management</h2>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Degree:</label>
            <select
              name="studentDegree"
              onChange={handleStudent}
              placeholder="Select student degree"
              className="p-2 border block w-full"
            >
              <option value="">Select Degree</option>
              <option value="B.Tech">Bachelor of Technolog (B.Tech)</option>
              <option value="M.Tech">Master of Technology (M.Tech)</option>
              <option value="PhD">Doctor of Philosophy (PhD)</option>
              {/* <option value="hss"> Humanities and Social Sciences (HSS)</option> */}
            </select>
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Department:</label>
            <select
              name="studentDepartment"
              onChange={handleStudent}
              placeholder="Select student type"
              className="p-2 border block w-full"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science and Engineering(CSE)</option>
              <option value="ECE">Electronics and Communication Engineering(ECE)</option>
              {/* <option value="maths">Maths & Science</option> */}
              {/* <option value="hss"> Humanities and Social Sciences (HSS)</option> */}
            </select>
          </div>

          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Roll No :</label>
            <input
              type="Number"
              name="studentRoll"
              onChange={handleStudent}
              placeholder="Enter roll number"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleStudent}
              placeholder="Enter name"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleStudent}
              placeholder="Enter email"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Semester:</label>
            <input
              type="Number"
              name="semester"
              value={semesterValue}
              onChange={handleStudent}
              placeholder="Enter semester"
              className="p-2 border block w-full"
            />
          </div>

          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Admission Year:</label>
            <select
              name="studentAdmisionYear"
              onChange={handleStudent}
              className="p-2 border block w-full"
            >
              <option value="">Admission Year</option>
              {renderAdmissionYearOptions()}
            </select>
          </div>

          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Select Section:</label>
            <select
              name="studentSection"
              // onChange={(e) => handleSectionSelect(e.target.value)}
              onChange={(e) => setSectionSelected(e.target.value)}
              // value={handleStudent}
              // disabled={groupSelected}
              className="p-2 border block w-full"
            >
              <option value="">Select Section</option>
              <option value="S11">Section S11</option>
              <option value="S12">Section S12</option>
              <option value="S13">Section S13</option>
              <option value="S21">Section S21</option>
              <option value="S22">Section S22</option>
              <option value="S23">Section S23</option>
              <option value="S31">Section S31</option>
              <option value="S32">Section S32</option>
              <option value="S33">Section S33</option>


            </select>
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Select Group:</label>
            <select
              name="studentGroup"
              // onChange={(e) => handleGroupSelect(e.target.value)}
              onChange={(e) => setGroupSelected(e.target.value)}
              // value={handleStudent}
              // disabled={sectionSelected}
              className="p-2 border block w-full"
            >
              <option value="">Select Group</option>
              <option value="G11">Group G11</option>
              <option value="G12">Group G12</option>
              <option value="G13">Group G13</option>
              <option value="G14">Group G14</option>
              <option value="CS21">Group CS21</option>
              <option value="CS22">Group CS22</option>
              <option value="EC21">Group EC21</option>
              <option value="EC22">Group EC22</option>
              <option value="CS31">Group CS31</option>
              <option value="CS32">Group CS32</option>
              <option value="EC31">Group EC31</option>
              <option value="EC32">Group EC32</option>



            </select>
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Phone:</label>
            <input
              type="Number"
              name="phone"
              onChange={handleStudent}
              placeholder="Enter phone"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col">
            <label className="block text-sm mb-1">Password:</label>
            <input
              type="password"
              name="studentPassword"
              onChange={handleStudent}
              placeholder="Enter phone"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2 w-11/12 sm:w-11/12 md:w-9/12 lg:w-2/5 flex flex-col ">
            <label className="block text-sm mb-1">
              Select Courses:
            </label>
            <select
              id="courseList"
              multiple
              onChange={(e) => handleCourseSelection(e, semesterValue)}
              // value={selectedCourses}
              className="w-full p-2 border block overflow-y-auto"
            // style={{ height: '50px' }} // Set height for better UI
            >
              {allCourses?.map((course) => (
                <option value={JSON.stringify(course)}>
                  {course.courseName}
                </option>

              ))}
            </select>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Subject:</h3>
              <ul className="list-disc pl-4">
                {selectedCourses?.map((course, index) => (
                  <li className="flex items-center">
                    <span>{course.courseName}</span>
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveSelectedCourse(index)}
                    >
                      &#10006;
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </div>


          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <button onClick={handleAddStudent} className="bg-green-500 text-white hover:bg-green-700 p-2 rounded-md m-2">
            Add Student
          </button>
          <button onClick={handleUpdateStudent} className="bg-blue-500 text-white hover:bg-blue-700 p-2 px-6 rounded-md m-2">
            Update
          </button>
          <button onClick={handleRemoveStudent} className="bg-red-500 text-white hover:bg-red-700 p-2 rounded-md m-2">
            Remove Student
          </button>
          <button onClick={handleViewAllStudents} className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md m-2">
            View Students
          </button>
          </div>
          {viewAllStudents && (
            <StudentList students={allStudents} />
          )}



          <h2>Note:</h2>
          <p>Select department,admission year,and roll No to remove and update</p>

        </div>
      )}

      {section === 'courses' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Courses Management</h2>
          <div className="mb-2">
            <label className="block text-sm mb-1">Course ID:</label>
            <input
              type="text"
              name="courseID"
              onChange={handleCourseChange}
              placeholder="Enter course ID"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Course Name:</label>
            <input
              type="text"
              name="courseName"
              onChange={handleCourseChange}
              placeholder="Enter course name"
              className="p-2 border block w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Department:</label>
            <select
              name="department"
              onChange={handleCourseChange}
              placeholder="Select department"
              className="p-2 border block w-full"
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science and Engineering(CSE)</option>
              <option value="ECE">Electronics and Communication Engineering(ECE)</option>
              <option value="MATHS&SCIENCE">Maths & Science</option>
              <option value="HSS"> Humanities and Social Sciences (HSS)</option>
              {/* <option value="science">Science</option> */}
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Degree:</label>
            <select
              name="degree"
              onChange={handleCourseChange}
              placeholder="Select degree"
              className="p-2 border block w-full"
            >
              <option value="">Select Degree</option>
              <option value="B.Tech">Bachelor of Technology(B.Tech)</option>
              <option value="M.Tech">Master of Technology(M.Tech)</option>
              <option value="PhD">Doctor of Philosophy(PhD)</option>
              {/* <option value="hss"> Humanities and Social Sciences (HSS)</option> */}
              {/* <option value="science">Science</option> */}
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm mb-1">Semester:</label>
            <input
              type="Number"
              name="semester"
              // defaultValue={semesterValue}
              value={semesterValue}
              onChange={handleCourseChange}
              placeholder="semester"
              className="p-2 border block w-full"
            />
          </div>
          <button onClick={handleAddCourse} className="bg-green-500 text-white hover:bg-green-700 p-2 px-6 rounded-md mb-2 mr-8">
            Add Course
          </button>
          <button onClick={handleUpdateCourse} className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md mb-2 mr-8">
            Update Course
          </button>
          <button onClick={handleAllCourse} className="bg-blue-500 text-white hover:bg-blue-700 p-2 rounded-md mb-2 mr-8">
            View all Courses
          </button>
          {/* <div className="mb-2">
            <label className="block text-sm mb-1">Course ID to Remove:</label>
            <input
              type="text"
              name="courseId"
              onChange={(e) => setSelectedCourseId(e.target.value)}
              placeholder="Enter course ID to remove"
              className="p-2 border block w-full"
            />
          </div> */}
          <button onClick={handleRemoveCourse} className="bg-red-500 text-white hover:bg-red-700 p-2 rounded-md">
            Remove Course
          </button>
          {viewAllcourses &&
            <CourseList onDelete={handleRemoveCourse} onEdit={handleUpdateCourse} courses={courses} />
          }

          <UploadCourses />
        </div>
      )}
    </div>
    // </div>
  );
};

export default EditOptions;
