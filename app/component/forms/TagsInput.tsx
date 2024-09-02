import React, { useState } from "react";

type TagsInputProps = {
  onChange: (tags: string[]) => void; // Callback to provide tags to parent
};

const TagsInput: React.FC<TagsInputProps> = ({ onChange }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // Handle input value change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle key press event to create tags
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault(); // Prevent form submission or default behavior
      setTags((prevTags) => {
        const newTags = [...prevTags, inputValue.trim()];
        onChange(newTags); // Notify parent component about the new tags
        return newTags;
      });
      setInputValue(""); // Clear the input field
    }
  };

  // Handle removing a tag
  const removeTag = (indexToRemove: number) => {
    setTags((prevTags) => {
      const newTags = prevTags.filter((_, index) => index !== indexToRemove);
      onChange(newTags);
      return newTags;
    });
  };

  return (
    <div className="tag-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
        className="h-12 rounded-lg px-4 border-2 border-black bg-gray-50 text-sm w-full mt-4"
      />
      <div className="flex gap-x-2 cursor-pointer">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            <span className="bg-primary text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded">
              {tag}
            </span>
            <button type="button" onClick={() => removeTag(index)}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
