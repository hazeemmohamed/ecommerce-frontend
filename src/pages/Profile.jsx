function Profile({ user }) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        <img
          src={user.avatar}
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>

        <div className="mt-6 border-t pt-4">
          <button className="w-full py-2 bg-blue-600 text-white rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile