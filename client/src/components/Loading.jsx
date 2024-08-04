/**
 * A loading component that displays a spinner with an optional name.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.name - An optional name to be logged when the component is rendered.
 * @returns {JSX.Element} - The loading component.
 */

export const Loading = ({ name }) => {
  if (name) {
    console.log("Loading", name);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-32 w-32 rounded-full border-b-2 border-gray-900">
        loading
      </div>
    </div>
  );
};
