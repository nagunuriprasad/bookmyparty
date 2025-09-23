import React, { useState } from "react";
import './assets/css/ServiceMenu.css';

const ServiceMenu: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="service-menu-wrapper">
      <h1 className="service-menu-header">
        BOOK MY PARTY SERVICE
        <br />
        <span className="service-menu-subheader">REGISTRATION FORM</span>
      </h1>

      <form className="service-menu-form">
        {/* Service Category */}
        <div className="service-menu-group">
          <label className="service-menu-label">Select your service category:</label>
          <select className="service-menu-select">
            <option>Select a service</option>
            <option value="Catering">Catering</option>
            <option value="venues">Venues</option>
            <option value="decoration">Decoration</option>
            <option value="Photo_Video">Photo & Videography</option>
            <option value="dj_lights">DJ & Lights</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        {/* Event Type */}
        <div className="service-menu-group">
          <label className="service-menu-label">Select Event type:</label>
          <select className="service-menu-select">
            <option>Select Event type</option>
            <option value="Private">Private</option>
            <option value="Corporate">Corporate</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Public">Public</option>
          </select>
        </div>

        {/* Subscription Type */}
        <div className="service-menu-group">
          <label className="service-menu-label">Select your event subscription type:</label>
          <select className="service-menu-select">
            <option>Select subscription type</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            <option value="PRO">PRO</option>
          </select>
        </div>

        {/* Service Title and Cost */}
        <div className="service-menu-row">
          <div className="service-menu-group-half">
            <label className="service-menu-label">Service title</label>
            <input type="text" className="service-menu-input" />
          </div>
          <div className="service-menu-group-half">
            <label className="service-menu-label">Cost of the service</label>
            <input type="text" className="service-menu-input" />
          </div>
        </div>

        {/* Short Description */}
        <div className="service-menu-group">
          <label className="service-menu-label">Short description</label>
          <input type="text" className="service-menu-input" />
        </div>

        {/* Long Description */}
        <div className="service-menu-group">
          <label className="service-menu-label">Long description</label>
          <textarea className="service-menu-textarea"></textarea>
        </div>

        {/* Company Information */}
        <div className="service-menu-group">
          <label className="service-menu-label">Company Information</label>
          <textarea className="service-menu-textarea"></textarea>
        </div>

        {/* Company Standards */}
        <div className="service-menu-group">
          <label className="service-menu-label">Company Standards</label>
          <textarea className="service-menu-textarea"></textarea>
        </div>

        {/* Upload Images */}
        <div className="service-menu-group">
          <label className="service-menu-upload-title">
            PLEASE UPLOAD IMAGES FOR YOUR SERVICE
          </label>
          <div className="service-menu-upload-container">
            <input type="file" className="service-menu-file-input" />
            <input type="file" className="service-menu-file-input" />
            <input type="file" className="service-menu-file-input" />
          </div>
        </div>

        {/* Upload Video */}
        <div className="service-menu-group">
          <label className="service-menu-upload-title">
            PLEASE UPLOAD VIDEO'S FOR YOUR SERVICE
          </label>
          <div className="service-menu-upload-container">
            <input type="file" className="service-menu-file-input" />
          </div>
          <div className="service-menu-upload-container">
            <input type="file" className="service-menu-file-input" />
          </div>
        </div>

        {/* Tags */}
        <div className="service-menu-group">
          <label className="service-menu-label">Tags</label>
          <div className="tag-input-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(index)}>
                  x
                </button>
              </span>
            ))}
            <input
              type="text"
              className="service-menu-tag-input"
              placeholder="Enter tags (e.g., food)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="service-menu-submit-btn">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ServiceMenu;
