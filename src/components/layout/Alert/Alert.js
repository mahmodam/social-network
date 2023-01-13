import React from "react";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

// Alert.defaultProps = {
//     alerts: []

// }

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

//const mapDispatchToProps = {};

export default connect(mapStateToProps)(Alert);
