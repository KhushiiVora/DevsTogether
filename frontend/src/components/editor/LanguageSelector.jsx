import { LANGUAGES } from "../../constants";
import { FormControl, Select, MenuItem } from "@mui/material";

const editorLanguages = Object.entries(LANGUAGES);

const LanguageSelector = (props) => {
  const { language, onSelect } = props;

  return (
    <>
      <FormControl
        sx={{
          m: 1,
          height: 39,
          minWidth: 120,
        }}
      >
        <Select
          className="code-editor__language_selector"
          value={language}
          onChange={(e) => onSelect(e.target.value)}
          inputProps={{ "aria-label": "Without label" }}
        >
          {editorLanguages.map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default LanguageSelector;
