import React, { useState,useEffect } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';

const FilterBar = props => {
  const [state, setState] = useState({ value: props.value });

  const select = value => {
    setState({ value: value });

    if (props.onChange) {
      props.onChange({
        target: {
          attributes: {
            model: {
              value: props.model
            }
          },
          value: value
        }
      });
    }
  };

  /*   useEffect(() => {
    setState(props.value);
}, [props.value]) //[props])
   console.log('FilterBar',props) //,props.meta,state.value) */

  let options = Object.keys(props.options).map((opt, idx) => {
    let cn = state.value === opt ? 'btn btn-primary' : 'btn btn-outline';
    let meta = (props.meta || {})[opt] || {};
    return (
      <NavItem key={`filter-${idx}`} className="ml-4 mr-4">
        <NavLink
          onClick={() => {
            select(opt);
          }}
        >
          <div className={cn}>
            {props.options[opt]}
            {meta.badge > 0 && (
              <div className="badge badge-pill badge-danger ml-2 mr-0 pl-1 pr-1">
                {meta.badge}
              </div>
            )}
          </div>
        </NavLink>
      </NavItem>
    );
  });

  return (
    <Navbar expand="md">
      <Nav className="mr-auto" navbar>
        {options}
      </Nav>
    </Navbar>
  );
};

export default FilterBar;
