import React, {Component} from 'react';
import {connectProfile, fetchAsUser} from '../auth';
import './Home.css';

class Home extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  };

  state = {
    message: null
  };

  async componentWillMount() {
    try {
      if (this.props.profile) {
        await this.fetchPrivateMessage();
      } else {
        await this.fetchPublicMessage();
      }
    } catch (error) {
      this.setState({message: 'API request failed. Start API server with `npm run start:api`.'});
    }
  }

  async fetchPublicMessage() {
    const response = await fetchAsUser('/api/public');
    const {message} = await response.json();
    this.setState({message});
  }

  async fetchPrivateMessage() {
    const response = await fetchAsUser('/api/private');
    const {message} = await response.json();
    this.setState({message});
  }

  render() {
    const {message} = this.state;

    return (
      <div className="Home">
        <div className="Home-intro" dangerouslySetInnerHTML={{__html: message}} />
      </div>
    );
  }
}

export default connectProfile(Home);
