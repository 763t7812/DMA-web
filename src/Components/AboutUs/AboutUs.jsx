//20july24
import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-customColor-circleColor">
        About Us
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-customColor-circleColor">
              Our Motto
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              "No job is too big or too small, for our competent team." We pride
              ourselves on the ability to meet customers where they are while
              exceeding their needs. We supply H-Frame scaffold which meets the
              needs of households and we supply cup lock and tube and clamp for
              projects.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-customColor-circleColor">
              Our Vision
            </h3>
            <p className="text-lg text-gray-700">
              At DMA, our vision is to be recognized as the premier provider of
              transport, scaffolding, and construction services in Trinidad &
              Tobago and throughout the Caribbean. We are committed to achieving
              this by adhering to the highest standards of safety, quality, and
              reliability in all our operations. Our goal is to foster a dynamic
              environment that encourages innovation and growth, enabling us to
              consistently exceed our clients' expectations.
              <br />
              <br />
              We believe that our success is built on the foundation of our
              dedicated team of professionals who bring their expertise and
              passion to every project. By investing in our employees' ongoing
              training and development, we ensure that they are equipped with
              the latest knowledge and skills to tackle any challenge.
              <br />
              <br />
              Furthermore, we are committed to sustainability and minimizing our
              environmental impact. We continuously seek out new methods and
              technologies that allow us to operate more efficiently and
              responsibly. Our vision also includes contributing positively to
              the communities we serve by supporting local initiatives and
              providing employment opportunities.
              <br />
              <br />
              Ultimately, we strive to be a company that not only meets but
              surpasses the needs of our clients, delivering exceptional service
              and value in every project we undertake. We aim to build lasting
              relationships based on trust, integrity, and mutual respect.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-customColor-circleColor">
              Managing Director
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Mr. Dave Murray is a joiner by profession and was the owner of a
              small woodworking business for more than 20 years. These
              experiences of having owned, operated, and managed a small
              enterprise have positioned this entrepreneur to effectively and
              successfully compete with other companies in the scaffolding
              business in the short time that he has ventured into this
              industry.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-customColor-circleColor">
              Our Team
            </h3>
            <ul className="list-disc pl-5 text-lg text-gray-700">
              <li className="font-bold mb-2">
                D.M.A Transport & Scaffolding Services Ltd., is a small company
                that comprises a number of competently trained and professional
                staff members. Employees fall in the following categories:
              </li>
              <li>Managing Director</li>
              <li>Accountant</li>
              <li>Operations Manager</li>
              <li>Project Manager</li>
              <li>HSE.Quality assurance advisor</li>
              <li>Administrative Manager</li>
              <li>Mason carpenters</li>
              <li>Joiners</li>
              <li>Riggers</li>
              <li>Riggers Assistant</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-customColor-circleColor">
          Our Address
        </h2>
        <p className="text-lg text-center text-gray-700">
        #7 Thomas Street, Sunshine Avenue, San Juan, Trinidad and Tobago
          <br />
          Call us at: (868)-674-6178
          <br />
          Email us at:{" "}
          <a href="mailto:dmag_07@yahoo.com" className="text-blue-500">
            dmag_07@yahoo.com
          </a>
          <br />
          For Hardware needs, call us at: (868)-374-7563
          <br />
          Email us at:{" "}
          <a
            href="mailto:dmaghardwaresupplies@gmail.com"
            className="text-blue-500"
          >
            dmaghardwaresupplies@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
