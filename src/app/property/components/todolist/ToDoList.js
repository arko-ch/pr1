import React, { useState, useEffect, Fragment } from 'react';
import { crud } from '../../../services/crud';
import { $store } from '../../../../index';
import $notify from '../../../services/notify';
import ToDoItem from './ToDoItem';
import fs from '../../PropertyStateHelper';

const $tasks = crud('tasks');

const ToDoList = props => {
  const { searchKey, context } = props;
  const { model } = props;
  const tasks = props.value;

  const fetchTasks = async () => {
    let params = {
      'context.propertyId': context.propertyId
    };
    if (searchKey) {
      params['or:title_contains'] = searchKey;
      params['or:owner.name_contains'] = searchKey;
    }
    let task = await $tasks.find(params);

    if (task) {
      fs.setState({ 'property.tasks': task.data });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [searchKey]);

  const addTask = async () => {
    let { id, name } = $store.getState().User.user.user;
    let tasks = await $tasks.save({
      title: 'New Task',
      meta: { urgent: false },
      context: context,
      owner: {
        id,
        name
      }
    });

    $notify.notify('Task saved');
    fetchTasks();
  };

  let taskItems = (tasks || []).map((task, idx) => {
    let meta = task.meta || {};
    return (
      <tr key={`todoItem-${idx}`}>
        <td width="1px">
          <div
            className={`bg-${meta.color}`}
            style={{ minHeight: '40px', height: '100%', width: '4px' }}
          ></div>
        </td>
        <td colSpan="12">
          <ToDoItem
            type="bool"
            idx={idx}
            task={task}
            {...fs.model(`${model}.${idx}`)}
          />
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      <table className="table todo-list-wrapper">
        <tbody>
          {taskItems.length != 0 ? (
            taskItems
          ) : props.searchKey ? (
            <tr>
              <td>
                <label>
                  We couldn't find anything for <b>{props.searchKey}</b>
                </label>
              </td>
            </tr>
          ) : (
            <tr>
              <td>"Nothing to show. Please add contact."</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="p-2">
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            addTask();
          }}
        >
          Add Task
        </button>
      </div>
    </Fragment>
  );
};

export default ToDoList;
