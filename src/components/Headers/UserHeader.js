import React from 'react';

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-6 d-flex align-items-center"
          style={{
            minHeight: '200px',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        ></div>
      </>
    );
  }
}

export default UserHeader;
