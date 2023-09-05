import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import echoMindLogo from '../images/Screenshot 2023-08-16 172928.png';

export default function Table() {
  const [userTasks, setUserTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [audioPlayingStatus, setAudioPlayingStatus] = useState({});
  const [newTask, setNewTask] = useState('');
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false);
  const [editTaskData, setEditTaskData] = useState({
    event_id: null,
    task: '',
    startTime: '',
    endTime: '',
  });
  const [updateMessage, setUpdateMessage] = useState('');
  const [deleteTaskData, setDeleteTaskData] = useState(null);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(
    false
  );
  const audioElement = useRef(null);
  const [taskNumber, setTaskNumber] = useState(1); // Initialize task number
  const toastRef = useRef(null);

  const editTask = (rowData) => {
    setEditTaskData({
      event_id: rowData.event_id,
      task: rowData.task,
      startTime: rowData.task_start_time, // Prepopulate the start time
      endTime: rowData.task_end_time, // Prepopulate the end time
    });
    setIsEditDialogVisible(true);
  };

  const toggleAudioPlayback = async (event_id, audio_url) => {
    try {
      if (audioPlayingStatus[event_id]) {
        // If audio is currently playing, pause it
        audioElement.current.pause();
      } else {
        // If audio is not playing, load and play it
        audioElement.current.src = `http://localhost:3000/${audio_url}`;
        await audioElement.current.play();
      }
  
      // Toggle the playback status
      setAudioPlayingStatus((prevState) => ({
        ...prevState,
        [event_id]: !prevState[event_id],
      }));
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleEditTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const requestData = {
        token: localStorage.getItem('token'),
        event_id: editTaskData.event_id,
        task: editTaskData.task, // Updated task name
        task_start_time: editTaskData.startTime,
        task_end_time: editTaskData.endTime,
      };

      const response = await fetch('http://localhost:3000/update-event', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setUpdateMessage(responseData.message);

        // Update userTasks with the edited task data
        const updatedTasks = userTasks.map((task) => {
          if (task.event_id === editTaskData.event_id) {
            return {
              ...task,
              task: editTaskData.task, // Update only the task name
              task_start_time: editTaskData.startTime,
              task_end_time: editTaskData.endTime,
            };
          }
          return task;
        });
        toastRef.current.show({
          severity: 'success',
          summary: 'success',
          detail: 'Login successful',
        });
        setUserTasks(updatedTasks);
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }

    setIsEditDialogVisible(false); // Close the dialog
  };

  const toast = useRef(null);
  const dt = useRef(null);

  const unique_id = localStorage.getItem('unique_id');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
  
        const requestData = {
          unique_id,
        };
  
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': token, // Send the token as an Authorization header without "Bearer"
        };
  
        const response = await fetch('http://localhost:3000/user-tasks', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(requestData),
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          // Check if the response contains a new token
          if (responseData.token) {
            // Update the token in local storage
            localStorage.setItem('token', responseData.token);
          }
  
          // Update userTasks and set task numbers
          const updatedUserTasks = responseData.userTasks.map((task, index) => ({
            ...task,
            taskNumber: index + 1,
          }));
          setUserTasks(updatedUserTasks);
          console.log(responseData);
        } else {
          console.error('Failed to fetch user tasks');
        }
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return ''; // Handle empty date
    const [datePart, timePart] = dateTimeStr.split('T'); // Split date and time
    const [year, month, day] = datePart.split('-').map(Number); // Parse date parts
    const [hour, minute] = timePart.split(':').map(Number); // Parse time parts
    const date = new Date(year, month - 1, day, hour, minute); // Create a Date object

    const timeFormat = 'hh:mma'; // Format for time (12-hour clock with AM/PM)
    const dateFormat = 'dd-MM-yyyy'; // Format for date
    return `${format(date, timeFormat)}-${format(date, dateFormat)}`;
  };

  const addNewTask = () => {
    setIsAddDialogVisible(true);
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const token = localStorage.getItem('token');
        const requestData = {
          token: localStorage.getItem('token'),
          text: newTask,
        };

        const response = await fetch('http://localhost:3000/add-event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
          body: JSON.stringify(requestData),
        });

        const responseData = await response.json();

        if (response.ok) {
          setUpdateMessage(responseData.message);

          // Add the newly created task to the userTasks array
          const newTaskData = {
            event_id: responseData.eventData.id, // Use the received ID
            task: responseData.eventData.task,
            task_start_time: responseData.eventData.task_start_time,
            task_end_time: responseData.eventData.task_end_time,
            taskNumber: userTasks.length + 1, // Increment task number
          };

          const updatedTasks = [...userTasks, newTaskData];
          setTaskNumber(taskNumber + 1); // Increment task number
          setUserTasks(updatedTasks);

          // Reset input and close the dialog
          setIsAddDialogVisible(false);
          setNewTask('');
          toastRef.current.show({
            severity: 'success',
            summary: 'success',
            detail: 'Task Added successfully',
          });
        } else {
          console.error('Failed to add task');
          toastRef.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add task',
          });
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const editDialogFooter = (
    <div className="d-flex justify-content-center">
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text fs-3"
        onClick={() => setIsEditDialogVisible(false)}
      />
      <Button
        label="Update"
        icon="pi pi-check"
        className="p-button-text fs-3"
        onClick={handleEditTask}
      />
    </div>
  );

  const confirmDeleteTask = (rowData) => {
    setDeleteTaskData(rowData);
    setIsDeleteConfirmationVisible(true);
  };

  // Function to send a DELETE request and update the table
  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem('token');
      const requestData = {
        token: localStorage.getItem('token'),
        event_id: deleteTaskData.event_id,
      };

      const response = await fetch('http://localhost:3000/delete-event', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setUpdateMessage(responseData.message);

        // Remove the deleted task from the userTasks state
        const updatedTasks = userTasks.filter(
          (task) => task.event_id !== deleteTaskData.event_id
        );
        toastRef.current.show({
          severity: 'success',
          summary: 'success',
          detail: 'successfully deleted',
        });
        setUserTasks(updatedTasks);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }

    setIsDeleteConfirmationVisible(false); // Close the delete confirmation dialog
  };

  const deleteConfirmationFooter = (
    <div className="d-flex justify-content-center">
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text fs-3"
        onClick={() => setIsDeleteConfirmationVisible(false)}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text fs-3"
        onClick={handleDeleteTask}
      />
    </div>
  );

  const navigate = useNavigate(); // Add this line to get the navigation function

  const handleLogout = () => {
    // Remove the UUID from local storage
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/login');
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap d-flex justify-content-center align-items-center mx-2">
        <a href="/">
          <img
            alt="logo"
            style={{ height: '7rem' }}
            src={echoMindLogo}
            className="mr-2"
          ></img>
        </a>
        <h4
          className="my-4 fs-1 fw-bold"
          style={{ position: 'relative', top: '2px' }}
        >
          Manage Tasks
        </h4>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="d-flex align-items-center">
        <span className="p-input-icon-left mx-2 d-flex flex-wrap">
          <i className="pi pi-search px-3" />
          <InputText
            className="fs-5 px-5 m-1 p-inputtext-lg rounded-pill"
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
        <div className="flex align-items-center justify-content-end">
          <Button
            type="button"
            icon="pi pi-plus fs-3"
            rounded
            className="m-1"
            style={{ height: '4rem', width: '4rem' }}
            onClick={() => addNewTask()}
          />
          <Button
            type="button"
            icon="pi pi-power-off fs-3"
            severity="warning"
            rounded
            className="m-1"
            style={{ height: '4rem', width: '4rem' }}
            onClick={handleLogout}
          />
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil fs-4"
          rounded
          outlined
          className="mr-2 my-2"
          style={{ height: '3rem', width: '3rem' }}
          onClick={() => editTask(rowData)}
        />
        <Button
          icon="pi pi-trash fs-4"
          rounded
          outlined
          severity="danger"
          style={{ height: '3rem', width: '3rem' }}
          className="m-2"
          onClick={() => confirmDeleteTask(rowData)}
        />
      </React.Fragment>
    );
  };

  const playPauseButtonTemplate = (rowData) => {
    const isPlaying = audioPlayingStatus[rowData.event_id];
  
    return (
      <Button
        icon={isPlaying ? 'pi pi-pause' : 'pi pi-play'}
        rounded
        outlined
        style={{ height: '3rem', width: '3rem' }}
        className="m-2"
        onClick={() => toggleAudioPlayback(rowData.event_id, rowData.audio_url)}
      />
    );
  };

  return (
    <div className="m-3" style={{ userSelect: 'none' }}>
      <Toast ref={toast} />
      <div className="card border-0">
        <Toolbar
          className="fs-4 mb-4 d-flex justify-content-sm-center justify-content-center justify-content-md-between justify-content-lg-between flex-lg-row flex-sm-column flex-md-row"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          className="fs-3"
          ref={dt}
          value={userTasks}
          selection={selectedTasks}
          onSelectionChange={(e) => setSelectedTasks(e.value)}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
        >
          <Column field="taskNumber" sortable header="Id" style={{ width: '5%' }} />
          <Column field="task" header="Task" style={{ width: '25%' }} />
          <Column field="task_start_time" header="Start Time" style={{ width: '20%' }} body={(rowData) => formatDateTime(rowData.task_start_time)} />
          <Column field="task_end_time" header="End Time" style={{ width: '20%' }} body={(rowData) => formatDateTime(rowData.task_end_time)} />
          <Column field="Actions" header="Actions" body={actionBodyTemplate} exportable={false} style={{ width: '10%' }} />
          <Column field="audio" header="Audio" body={playPauseButtonTemplate} style={{ width: '10%' }} />
        </DataTable>
        <audio ref={audioElement} controls style={{ display: 'none' }} />
        <div className="card flex justify-content-center">
          <Toast ref={toastRef} />
          {/* <Button onClick={show} label="Show" /> */}
        </div>  
      </div>

      <Dialog visible={isEditDialogVisible} className="w-75" onHide={() => setIsEditDialogVisible(false)} footer={editDialogFooter} header="Edit Task">
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="editTask">Edit Task</label>
            <InputText id="editTask" className="fs-4" value={editTaskData.task} onChange={(e) => setEditTaskData({ ...editTaskData, task: e.target.value })} placeholder="Edit the task!" />
          </div>
          <div className="p-field">
            <label htmlFor="editStartTime">Start Time</label>
            <InputText
              id="editStartTime"
              className="fs-4"
              value={editTaskData.startTime} // Display the time directly (as a string)
              onChange={(e) => setEditTaskData({ ...editTaskData, startTime: e.target.value })} // Update startTime directly
            />
          </div>
          <div className="p-field">
            <label htmlFor="editEndTime">End Time</label>
            <InputText
              id="editEndTime"
              className="fs-4"
              value={editTaskData.endTime} // Display the time directly (as a string)
              onChange={(e) => setEditTaskData({ ...editTaskData, endTime: e.target.value })} // Update endTime directly
            />
          </div>
        </div>
      </Dialog>

      {updateMessage && (
        <div className="p-grid">
          <div className="p-col-12">
            <div className="card">
              <div className="p-card-body">
                <h5>{updateMessage}</h5>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog visible={isAddDialogVisible} className="w-75" onHide={() => setIsAddDialogVisible(false)} header="Add New Task">
        <div className="p-fluid">
          <div className="p-field">
            {/* <label htmlFor="newTask">New Task</label> */}
            <InputText id="newTask" className="fs-4" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a new task" />
          </div>
        </div>
        <div className="p-dialog-footer">
          <Button label="Cancel" icon="pi pi-times" className="p-button-text fs-3" onClick={() => setIsAddDialogVisible(false)} />
          <Button label="Add" icon="pi pi-check" className="p-button-text fs-3" onClick={handleAddTask} />
        </div>
      </Dialog>
      <Dialog
        visible={isDeleteConfirmationVisible}
        className="w-50"
        onHide={() => setIsDeleteConfirmationVisible(false)}
        footer={deleteConfirmationFooter}
        header="Confirm Delete"
      >
        <div className="p-fluid">
          <div className="p-field">
            <label className="fs-3">Are you sure you want to delete this event?</label>
          </div>
        </div>
      </Dialog>
    </div>
  );
}