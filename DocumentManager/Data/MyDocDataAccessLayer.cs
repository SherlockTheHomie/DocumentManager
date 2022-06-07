using CsvHelper;
using System.Globalization;
using DocumentManager.Models;
using CsvHelper.Configuration;
using Microsoft.EntityFrameworkCore;


namespace DocumentManager.Data
{
    public class MyDocDataAccessLayer : IDisposable, IMyDocDataAccessLayer
    {
        private const bool V = true;
        private readonly DocDBContext _context;

        private readonly ILogger<MyDocDataAccessLayer> _logger;

        public MyDocDataAccessLayer(DocDBContext context, ILogger<MyDocDataAccessLayer> logger)
        {
            _context = context;
            _logger = logger;
        }

        //public MyDocDataAccessLayer() { }

        private class DocumentClassMap : ClassMap<Document>
        {
            private DocumentClassMap()
            {
                Map(r => r.Id).Name("Id");
                Map(r => r.Name).Name("Name");
                Map(r => r.Path).Name("Path");
                Map(r => r.Category).Name("Category");
            }
        }

        public int UpdateFileList()
        {
            var records = GetAllDocs();
            {
                using (var writer = new StreamWriter(@"assets\Documents.csv"))
                using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
                {
                    csv.WriteRecords((System.Collections.IEnumerable)records);
                    return 1;
                }
            };

        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {


            }
        }

        public async Task<int> DeleteFile(int id)

        {
            var existingDoc = await _context.Documents.FirstOrDefaultAsync(x => x.Id == id);
            if (existingDoc != null)
            {
                _context.Remove(existingDoc);
                return await _context.SaveChangesAsync();


            }
            throw new InvalidOperationException();

        }

        public async Task<Document> GetById(int id)
        {

            var docToGet = await _context.Documents.FindAsync(id);
            if (docToGet != null)
            {
                return docToGet;
            }

            throw new NotImplementedException();
        }

        public async Task<List<Document>> GetAllDocs()
        {
            var allDocs = await _context.Documents.ToListAsync();
            return allDocs;
        }

        public Task<bool> DestroyDocument(string absolutePath)
        {
            if (File.Exists(absolutePath))
            {
                File.Delete(absolutePath);
                Console.WriteLine("Victory, your enemy is dead!");

                UpdateFileList();

                return Task.FromResult(true);
            }
            else
            {
                return Task.FromResult(false);
            }
        }
    }
}
