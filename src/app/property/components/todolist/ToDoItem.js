import React, { useState, useEffect, Fragment } from 'react';
import { ListGroupItem, Input, Row, Col } from 'reactstrap';
import { Library as Icons, FontAwesomeIcon } from '../../../icons';
//import EditableTaskTitle from './EditableTaskTitle';
import Journal from './Journal';
import debounce from 'debounce';
import { crud } from '../../../services/crud';
import { ColorTypes } from '../../services';
import notify from '../../../services/notify';
import { $store } from '../../../../index';
//strapiV3
import { Store as UserStore } from 'app/auth/store';

import fs from '../../PropertyStateHelper';

import { SelectStatusIcons } from 'app/components/selectStatus/SelectStatus';

const ColorTypeMetas = {
  light: { className: 'text-secondary' },
  primary: { className: 'text-primary' },
  success: { className: 'text-success' },
  warning: { className: 'text-warning' },
  danger: { className: 'text-danger' },
  gray: { className: 'text-muted' },
  dark: { className: 'text-dark' },
  info: { className: 'text-info' }
};

const options = Object.keys(ColorTypes).map(k => {
  return {
    value: k,
    label: ColorTypes[k],
    icon: 'faFlagCheckered',
    ...ColorTypeMetas[k]
  };
});

const $tasks = crud('tasks');

const ToDoItem = props => {
  const userStore = React.useContext(UserStore);

  const { task, model, idx } = props;
  // const [colorTypes, setClorTypes] = useState({ '?': 'Select', ...ColorTypes });

  const [journalEntry, setJournalEntry] = useState('');

  task.meta = task.meta || {};

  // remove this
  const [state, setState] = useState({
    showMore: false
  });

  const save = async () => {
    let res = null;
    try {
      res = await $tasks.save(fs.getState(model));
    } catch (err) {
      console.log(err);
    }

    if (res) {
      notify.notify('Task saved');
    }
  };

  const onBlur = async () => {
    save();
  };

  const toggleComplete = async () => {
    fs.setState({
      [`${model}.completed`]: !task.completed
    });
    setTimeout(save, 50);
  };

  let urgent = task.meta.color === 'danger';
  let color = task.meta.color;

  const addJournalEntry = () => {
    console.log(userStore.state);
    fs.setState({
      [`${model}.journal`]: [
        ...(fs.getState(`${model}.journal`) || []),
        {
          text: journalEntry,
          author: userStore.state.user,
          date: new Date()
        }
      ]
    });
    setTimeout(() => {
      save();
      setJournalEntry('');
    }, 50);
  };

  let owner = task.owner || {};
  let addedBy = null;
  let Wrap = task.completed ? 'del' : Fragment;
  if (owner.name) {
    addedBy = (
      <p className="h8 text-muted">
        <em> Added by {owner.name} </em>
      </p>
    );
  }

  let tags = null;
  if (urgent) {
    tags = (
      <Fragment>
        <div className="badge badge-pill badge-danger ml-2 mr-0 pl-2 pr-2">
          Urgent
        </div>
      </Fragment>
    );
  }

  return (
    <div>
      <Row>
        <Col>
          <div className="float-left custom-checkbox custom-control">
            <input
              id={`${model}.completed`}
              type="checkbox"
              className="custom-control-input"
              checked={task.completed || false}
              onChange={evt => {
                fs.setState({
                  [`${model}.completed`]: evt.target.checked
                });
                setTimeout(() => {
                  save();
                }, 50);
              }}
            />
            <label
              className="custom-control-label"
              htmlFor={`${model}.completed`}
            >
              &nbsp;
            </label>
          </div>
          <div className="float-left ml-4">
            <Wrap>
             {/*  <EditableTaskTitle
                {...fs.model(`${model}.title`)}
                onBlur={onBlur}
              /> */}
            </Wrap>
            {tags} {addedBy}
          </div>
          <div className="float-right">
            <button
              className="border-0 btn-transition"
              onClick={() => {
                setState({
                  ...state,
                  showMore: !state.showMore
                });
              }}
              outline="true"
              color="primary"
            >
              <FontAwesomeIcon
                icon={state.showMore ? Icons.faAngleUp : Icons.faAngleDown}
              />
            </button>
          </div>
        </Col>
      </Row>
      {state.showMore && (
        <Row>
          <Col>
            <Journal journal={task.journal} />
            <Input
              placeholder="Follow-up"
              value={journalEntry}
              onChange={evt => {
                setJournalEntry(evt.target.value);
              }}
              // {...fs.model(`${model}.journalEntry`)}
            />
            {journalEntry && (
              <button
                className="btn btn-primary mt-2"
                onClick={() => {
                  addJournalEntry();
                }}
              >
                Add Follow - Up
              </button>
            )}
            <hr />
            <Row className="ml-4">
              <Col>
                <SelectStatusIcons
                  options={options}
                  value={color}
                  onChange={value => {
                    fs.setState({
                      [`${model}.meta.color`]: value
                    });
                    setTimeout(() => {
                      save();
                    }, 50);
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ToDoItem;
