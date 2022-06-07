using DocumentManager.Models;

namespace DocumentManager.Data
{
    public interface IMyDocDataAccessLayer
    {
        Task<int> DeleteFile(int id);
        void Dispose();
        Task<List<Document>> GetAllDocs();
        Task<Document> GetById(int id);
        int UpdateFileList();
        Task <bool> DestroyDocument(string absolutePath);
        
    }
}