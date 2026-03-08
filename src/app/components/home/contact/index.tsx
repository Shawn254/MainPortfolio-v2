"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Contact = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactData(data?.contactLinks);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  const reset = () => {
    setFormData({
      name: "",
      number: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch("https://formsubmit.co/ajax/nderitushawn5@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setSubmitted(true);
        reset();
      } else {
        // Handle rate limits or other server errors
        alert(data.message || "Submission failed. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="no-print">
      <div className="container">
        <div className="pt-16 md:pt-32 pb-20">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
            <h2>Contact Me</h2>
            <p className="text-xl text-orange-500">( 05 )</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7 sm:gap-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="label">Name *</label>
                    <input
                      required
                      className="input"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="number" className="label">Phone *</label>
                    <input
                      required
                      className="input"
                      id="number"
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="label">Email *</label>
                  <input
                    required
                    className="input"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="label">Message *</label>
                  <textarea
                    required
                    className="input"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                {submitted && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={getImgPath("/images/icon/success-icon.svg")}
                      alt="success-icon"
                      width={30}
                      height={30}
                    />
                    <p className="text-secondary">
                      Great!!! Email has been Successfully Sent. We will get in touch asap.
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading} // Prevent multiple clicks
                  className={`relative overflow-hidden cursor-pointer w-fit py-2 sm:py-3 md:py-5 px-4 sm:px-5 md:px-7 border border-primary rounded-full group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="relative z-10 text-xl font-medium text-primary group-hover:text-white transition-colors duration-300">
                    {loading ? "Sending..." : "Send Now"}
                  </span>
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row md:flex-col justify-between gap-5 md:gap-20 items-center md:items-end">
              <div className="flex flex-wrap flex-row md:flex-col items-start md:items-end gap-4 md:gap-6">
                {contactData?.socialLinks?.map((value: any, index: any) => (
                  <div key={index}>
                    <Link
                      className="text-base sm:text-lg font-normal text-secondary hover:text-primary"
                      href={value?.link || "https://wa.me/+254721447397"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {value?.title}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-5 lg:gap-11 items-end">
                {contactData?.contactInfo?.map((value: any, index: any) => (
                  <div key={index}>
                    <Link
                      href={value?.link || "https://www.linkedin.com/in/shawn-nderitu-a6a890200/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base lg:text-lg text-black font-normal border-b border-black pb-3 hover:text-primary hover:border-primary"
                    >
                      {value?.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;