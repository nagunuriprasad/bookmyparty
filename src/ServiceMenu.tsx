import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { updateForm, resetForm, submitServiceForm } from "./slices/serviceSlice";
import './assets/css/ServiceMenu.css';

const ServiceMenu: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { form, loading, error, success } = useSelector((state: RootState) => state.service);

  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (success) {
      setTags([]);
      setInputValue("");
    }
  }, [success]);

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        const updatedTags = [...tags, inputValue.trim()];
        setTags(updatedTags);
        dispatch(updateForm({ tags: updatedTags }));
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    dispatch(updateForm({ tags: updatedTags }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "images" | "videos") => {
    if (e.target.files) {
      dispatch(updateForm({ [type]: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic front-end validation
    if (!form.category || !form.eventType || !form.subscriptionType || !form.title || !form.cost) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await dispatch(submitServiceForm(form)).unwrap();
      dispatch(resetForm());
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="service-menu-wrapper">
      <h1 className="service-menu-header">
        BOOK MY PARTY SERVICE
        <br />
        <span className="service-menu-subheader">REGISTRATION FORM</span>
      </h1>

      <form className="service-menu-form" onSubmit={handleSubmit}>
        {/* Category */}
        <div className="service-menu-group">
          <label className="service-menu-label">Select your service category:</label>
          <select className="service-menu-select" name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select a service</option>
            <option value="Catering">Catering</option>
            <option value="Venues">Venues</option>
            <option value="Decoration">Decoration</option>
            <option value="Photo_Video">Photo & Videography</option>
            <option value="DJ_Lights">DJ & Lights</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        {/* Event Type */}
        <div className="service-menu-group">
          <label className="service-menu-label">Select Event type:</label>
          <select className="service-menu-select" name="eventType" value={form.eventType} onChange={handleChange} required>
            <option value="">Select Event type</option>
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
          <select className="service-menu-select" name="subscriptionType" value={form.subscriptionType} onChange={handleChange} required>
            <option value="">Select subscription type</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
            <option value="PRO">PRO</option>
          </select>
        </div>

        {/* Title and Cost */}
        <div className="service-menu-row">
          <div className="service-menu-group-half">
            <label className="service-menu-label">Service title</label>
            <input type="text" className="service-menu-input" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="service-menu-group-half">
            <label className="service-menu-label">Cost of the service</label>
            <input type="text" className="service-menu-input" name="cost" value={form.cost} onChange={handleChange} required />
          </div>
        </div>

        {/* Short Description */}
        <div className="service-menu-group">
          <label className="service-menu-label">Short description</label>
          <input type="text" className="service-menu-input" name="shortDescription" value={form.shortDescription} onChange={handleChange} />
        </div>

        {/* Long Description */}
        <div className="service-menu-group">
          <label className="service-menu-label">Long description</label>
          <textarea className="service-menu-textarea" name="longDescription" value={form.longDescription} onChange={handleChange}></textarea>
        </div>

        {/* Company Info */}
        <div className="service-menu-group">
          <label className="service-menu-label">Company Information</label>
          <textarea className="service-menu-textarea" name="companyInfo" value={form.companyInfo} onChange={handleChange}></textarea>
        </div>

        {/* Company Standards */}
        <div className="service-menu-group">
          <label className="service-menu-label">Company Standards</label>
          <textarea className="service-menu-textarea" name="companyStandards" value={form.companyStandards} onChange={handleChange}></textarea>
        </div>

        {/* Images */}
        <div className="service-menu-group">
          <label className="service-menu-upload-title">Upload Images</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, "images")} />
        </div>

        {/* Videos */}
        <div className="service-menu-group">
          <label className="service-menu-upload-title">Upload Videos</label>
          <input type="file" multiple onChange={(e) => handleFileChange(e, "videos")} />
        </div>

        {/* Tags */}
        <div className="service-menu-group">
          <label className="service-menu-label">Tags</label>
          <div className="tag-input-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(index)}>x</button>
              </span>
            ))}
            <input
              type="text"
              className="service-menu-tag-input"
              placeholder="Enter tags"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTag}
            />
          </div>
        </div>

        {/* Error & Success Messages */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>Service submitted successfully!</p>}

        <button type="submit" className="service-menu-submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ServiceMenu;
