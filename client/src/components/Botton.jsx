function CustomBtn({label}) {
    return (
      <button className="rounded bg-secondary-base py-2 px-4 text-sm text-white hover:bg-primary-base active:bg-sky-700">
        {label}
      </button>
    );
  }
  
  export default Btn;
// applied this when want to be used <CustomBtn  label="ดาวน์โหลด"/>
