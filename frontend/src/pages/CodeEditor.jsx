import { useRef, useState } from "react";
import axios from "axios";
import { Editor } from "@monaco-editor/react";
import useTheme from "../hooks/useTheme";
import { LANGUAGE_TEMPLATES, LANGUAGE_VERSIONS } from "../constants";
import LanguageSelector from "../components/editor/LanguageSelector";
import OutputScreen from "../components/editor/OutputScreen";
import { StyledSection } from "../styles/codeEditor.styles";
import { StyledFilledButton } from "../styles/button.styles";

function CodeEditor() {
  const editorRef = useRef();
  const { isDark } = useTheme();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [output, setOutput] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (code) => {
    setCode(code);
  };
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (language) => {
    setLanguage(language);
    setCode(LANGUAGE_TEMPLATES[language]);
  };

  const executeCode = async (event) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language,
          version: LANGUAGE_VERSIONS[language],
          files: [
            {
              content: code,
            },
          ],
        }
      );
      console.log(response.data);
      const { run: result } = response.data;
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledSection>
      <div className="code-editor__editor">
        <div>
          <LanguageSelector language={language} onSelect={onSelect} />
          <StyledFilledButton
            disabled={isLoading}
            data-button-type="outlined"
            onClick={executeCode}
          >
            Run Code
          </StyledFilledButton>
        </div>
        <Editor
          height="90vh"
          theme={`vs-${isDark ? "dark" : "light"}`}
          language={language}
          defaultValue={LANGUAGE_TEMPLATES[language]}
          value={code}
          onChange={handleOnChange}
          onMount={onMount}
        />
      </div>
      <div className="code-editor__output">
        <h2>Output:</h2>
        <OutputScreen isLoading={isLoading} isError={isError} output={output} />
      </div>
    </StyledSection>
  );
}

export default CodeEditor;
