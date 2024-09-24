import React, { useRef } from 'react';
import { spinner } from '../../assets';
import { useNavigate } from 'react-router-dom'; // remove 'div' import
import { PiXLight } from 'react-icons/pi';

const SearchResult = ({ open, loading, searchResult, setShowSearchResult }) => {
  const searchResultBox = useRef();
  const navigate = useNavigate();

  const handleNavigate = (username) => {
    setShowSearchResult(false);
    navigate(`/profile/${username}/`, { replace: true });
  };

  return (
    <div
      className={`search-result ${open ? 'show-search-result' : ''}`}
      ref={searchResultBox}
    >
      <div
        className="close-search-modal"
        onClick={() => setShowSearchResult(!open)}
      >
        <PiXLight size={20} />
      </div>

      <div className="search-result-container">
        {loading ? (
          <div className="search-spinner">
            <img src={spinner} alt="Loading" width={100} height={100} />
          </div>
        ) : (
          <>
            {searchResult?.results?.length > 0 ? ( // Use optional chaining to prevent errors
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {searchResult.results.map((result, id) => (
                  <div
                    className="follower-section"
                    key={id}
                    onClick={() => handleNavigate(result.username)}
                    style={{ cursor: 'pointer' }} // Ensure the cursor is pointer
                  >
                    <div className="follower-profile-image">
                      <img src={result.profile_pic} alt="Profile" />
                    </div>
                    <div className="follower-profile-content">
                      <p className="follower-name">
                        {result.first_name + ' ' + result.last_name}
                      </p>
                      <p className="follower-bio">{result.username}</p>
                      <p className="follower-bio">{result.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>No user found</>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
