export default () => {
  return (
    <section class="grid grid-cols-1 md:grid-cols-3 gap-2 my-6 op-60 text-slate text-sm">
      <div class="bg-slate bg-opacity-15 p-6 rounded-md flex gap-3 md:flex-col items-center md:justify-center">
        <div px-4 py-2 text-xl font-extrabold bg-light-50 bg-op-10 rounded-lg>1</div>
        <div text-center>Enter your first sentence</div>
      </div>
      <div class="bg-slate bg-opacity-15 p-6 rounded-md flex gap-3 md:flex-col items-center md:justify-center">
      <div px-4 py-2 text-xl font-extrabold bg-light-50 bg-op-10 rounded-lg>2</div>
        <div text-center>AI picks up your creation</div>
      </div>
      <div class="bg-slate bg-opacity-15 p-6 rounded-md flex gap-3 md:flex-col items-center md:justify-center">
      <div px-4 py-2 text-xl font-extrabold bg-light-50 bg-op-10 rounded-lg>3</div>
        <div text-center>Continue to enter your part</div>
      </div>
    </section>
  )
}