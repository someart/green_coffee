import React from 'react';

const Contact = () => {
  return (
    <section className="mb-32">
      <div className="relative h-[300px] overflow-hidden">
        <img
          src="/BG/Party.png" // Replace with the path to your image
          alt="Coffee Shop Location"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container px-6 md:px-12">
        <div className="block rounded-lg bg-white bg-opacity-80 px-6 py-12 shadow-lg md:py-16 md:px-12 -mt-[100px] backdrop-blur-md border border-gray-300">
          <div className="flex flex-wrap">
            <div className="mb-12 w-full md:w-5/12 lg:mb-0 lg:px-6">
              <form>
                <InputField id="name" label="Name" type="text" required />
                <InputField id="email" label="Email address" type="email" required />
                <TextareaField id="message" label="Message" required />
                <div className="mb-6 flex items-center">
                  <input type="checkbox" id="copy" className="mr-2" />
                  <label htmlFor="copy">Send me a copy of this message</label>
                </div>
                <button type="submit" className="w-full rounded bg-amber-900 text-white px-6 py-2 text-xs font-medium uppercase">
                  Send
                </button>
              </form>
            </div>
            <div className="w-full md:w-7/12">
              <ContactInfo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  required: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type, required }) => (
  <div className="relative mb-6">
    <input
      type={type}
      id={id}
      required={required}
      className="peer block w-full rounded border-2 bg-transparent py-2 px-3 leading-6 outline-none transition-all duration-200 focus:border-sky-500"
    />
<label
  htmlFor={id}
  className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] pt-2 leading-6 text-gray-500 transition-all duration-200 transform peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-sky-500"
>
  {label}
</label>
  </div>
);

interface TextareaFieldProps {
  id: string;
  label: string;
  required: boolean;
}

const TextareaField: React.FC<TextareaFieldProps> = ({ id, label, required }) => (
  <div className="relative mb-6">
    <textarea
      id={id}
      required={required}
      rows={3}
      className="peer block w-full rounded border-2 bg-transparent py-2 px-3 leading-6 outline-none transition-all duration-200 focus:border-sky-500"
    ></textarea>
    <label
      htmlFor={id}
      className="absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] pt-2 leading-6 text-gray-500 transition-all duration-200 transform peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-sky-500"
    >
      {label}
    </label>
  </div>
);

interface ContactDetailProps {
  icon: string;
  title: string;
  info: string;
}

const ContactDetail: React.FC<ContactDetailProps> = ({ icon, title, info }) => (
  <div className="mb-12 w-full md:w-6/12 lg:w-full lg:px-6">
    <div className="flex items-start">
      <div className="shrink-0 text-2xl">{icon}</div>
      <div className="ml-4">
        <p className="mb-1 font-bold">{title}</p>
        <p className="text-sm text-gray-500">{info}</p>
      </div>
    </div>
  </div>
);

const ContactInfo = () => (
  <div className="flex flex-wrap">
    <ContactDetail
      icon="📧"
      title="Technical Support"
      info="example@gmail.com"
    />
    <ContactDetail
      icon="🏠"
      title="Address"
      info="abcd, xyz"
    />
  </div>
);

export default Contact;