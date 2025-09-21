 {/* App Features Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Our Mobile App
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Access healthcare on the go with our feature-packed mobile application
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <FaMobileAlt className="text-teal-400 text-xl" />, title: "Telemedicine", desc: "Video consultations with doctors from anywhere" },
                  { icon: <FaHeartbeat className="text-teal-400 text-xl" />, title: "Health Tracking", desc: "Monitor your health metrics over time" },
                  { icon: <FaClock className="text-teal-400 text-xl" />, title: "Medication Reminders", desc: "Never miss a dose with smart alerts" },
                  { icon: <FaDownload className="text-teal-400 text-xl" />, title: "Health Records", desc: "Access your medical history anytime" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-teal-900/30 p-3 rounded-lg mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-8">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                  <FaDownload className="mr-2" /> App Store
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                  <FaDownload className="mr-2" /> Play Store
                </button>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-72 h-96 bg-gradient-to-b from-teal-900/20 to-blue-900/20 rounded-3xl border-2 border-teal-400/30 shadow-2xl flex items-center justify-center">
                  <div className="text-teal-400 text-6xl">
                    <GiHealthPotion />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>