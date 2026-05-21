import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    searchInput: '',
    showPasswords: false,
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    if (website && username && password) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPassword],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  onDelete = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filteredList})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onToggleShowPasswords = () => {
    this.setState(prev => ({showPasswords: !prev.showPasswords}))
  }

  getFilteredList = () => {
    const {passwordsList, searchInput} = this.state
    return passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {website, username, password, searchInput, showPasswords} = this.state

    const filteredList = this.getFilteredList()

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        {/* Add Password */}
        <div className="top-section">
          <form className="form" onSubmit={this.onAddPassword}>
            <h1>Add New Password</h1>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="manager-img"
          />
        </div>

        {/* Password List */}
        <div className="bottom-section">
          <div className="header">
            <h1>Your Passwords</h1>
            <p className="count">{filteredList.length}</p>

            <div className="search-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearch}
              />
            </div>
          </div>

          <div className="show-passwords">
            <input
              type="checkbox"
              id="show"
              onChange={this.onToggleShowPasswords}
            />
            <label htmlFor="show">Show Passwords</label>
          </div>

          {filteredList.length === 0 ? (
            <div className="no-passwords">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-list">
              {filteredList.map(each => (
                <li key={each.id} className="password-item">
                  <div>
                    <p>{each.website}</p>
                    <p>{each.username}</p>

                    {showPasswords ? (
                      <p>{each.password}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                      />
                    )}
                  </div>

                  <button
                    type="button"
                    data-testid="delete"
                    onClick={() => this.onDelete(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
