function CustomBtn({label}) {
    return (
      <button className="flex justify-center w-16 rounded bg-secondary-base py-2 px-4 text-sm text-white hover:bg-primary-base active:bg-sky-700">
        {label}
      </button>
    );
  }
  
  export default CustomBtn;
// applied this when want to be used <CustomBtn  label="ดาวน์โหลด"/>
