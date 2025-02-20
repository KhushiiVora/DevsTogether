import { CircularProgress } from "@mui/material";
function OutputScreen(props) {
  const { isLoading, isError, output } = props;
  return (
    <div
      className={`code-editor__output-console ${
        isError ? "code-editor__output-console--error" : ""
      } ${isLoading ? "code-editor__output-console--loading" : ""}`}
    >
      {isLoading ? (
        <>
          <CircularProgress color="inherit" size="2rem" />
          Loading the output
        </>
      ) : output ? (
        output.map((line, i) => <p key={line + i}>{line}</p>)
      ) : (
        'Click "Run Code" to run the code.'
      )}
    </div>
  );
}

export default OutputScreen;
