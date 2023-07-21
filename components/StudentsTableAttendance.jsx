'use client'
import React, { useState, useEffect } from 'react'
import { Table } from 'flowbite-react';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { mutate } from 'swr';

const StudentsTableAttendance = ({students, date}) => {
    const { toast } = useToast();
    const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const currentDate = date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    const [studentAttendance, setStudentAttendance] = useState([]);

    console.log(studentAttendance);

    useEffect(() => {
      setStudentAttendance(
        students.map((student) => {
          const attendanceForCurrentDate = student.attendances.find((attendance) => {
            const attendanceDate = new Date(attendance.createdAt).toLocaleDateString(undefined, {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
            return attendanceDate === currentDate;
          });
  
          return {
            id: student.id,
            isPresent: attendanceForCurrentDate ? attendanceForCurrentDate.isPresent : false,
            temperature: attendanceForCurrentDate ? attendanceForCurrentDate.temperature : '',
            reasonForAbsence: attendanceForCurrentDate ? attendanceForCurrentDate.reasonForAbsence : ''
          };
        })
      );
    }, [students, currentDate]);

    const handleSubmitAttendance = () => {
        // Send PATCH requests for each student's attendance
        studentAttendance.forEach((student) => {
          const { id, isPresent, reasonForAbsence, temperature } = student;
          const body = { isPresent, reasonForAbsence, currentDate, temperature };
          // Send PATCH request to update attendance for each student
          fetch(`/api/students/${id}/attendance`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then((response) => {
              mutate(`${apiUrl}/api/students/${id}`);
              toast({
                title: "Success",
                description: `Attendance for ${currentDate} has been updated !`,
                variant: "success"
              })
              
            })
            .catch((error) => {
              console.log(error);
            });
        });
    };

  return (
    <div className='flex flex-col gap-6 items-center w-full'>

      <div className='box-border w-full relative overflow-x-auto shadow-md'>
        <Table striped>
              <Table.Head>
                  <Table.HeadCell>
                      S/N
                  </Table.HeadCell>
                  <Table.HeadCell>
                      Name
                  </Table.HeadCell>
                  <Table.HeadCell>
                      Attendance
                  </Table.HeadCell>
                  <Table.HeadCell>
                      Temperature
                  </Table.HeadCell>
                  <Table.HeadCell>
                      Reason for absence
                  </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                  {students.map((student, index) => (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={student.id}>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{index+1}</Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{student.name}</Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              <div className='flex gap-2 items-center'>
                                  Absent
                                  <Switch
                                      checked={studentAttendance[index]?.isPresent}
                                      onCheckedChange={(isChecked) =>
                                      setStudentAttendance((prevAttendance) => {
                                          const updatedAttendance = [...prevAttendance];
                                          updatedAttendance[index].isPresent = isChecked;
                                          return updatedAttendance;
                                      })
                                      }
                                  />
                                  Present
                              </div> 
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              <Input
                                  type="text"
                                  value={studentAttendance[index]?.temperature}
                                  onChange={(e) =>
                                      setStudentAttendance((prevAttendance) => {
                                      const updatedAttendance = [...prevAttendance];
                                      updatedAttendance[index].temperature = e.target.value;
                                      return updatedAttendance;
                                      })
                                  }
                              />
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              <Input
                                  type="text"
                                  value={studentAttendance[index]?.reasonForAbsence}
                                  onChange={(e) =>
                                      setStudentAttendance((prevAttendance) => {
                                      const updatedAttendance = [...prevAttendance];
                                      updatedAttendance[index].reasonForAbsence = e.target.value;
                                      return updatedAttendance;
                                      })
                                  }
                              />
                          </Table.Cell>
                      </Table.Row>
                  ))}

              </Table.Body>
          </Table>        
      </div>

      <Button onClick={handleSubmitAttendance}>Submit Attendance</Button>
        
    </div>
  )
}

export default StudentsTableAttendance