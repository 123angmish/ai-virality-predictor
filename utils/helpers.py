import os
import mimetypes
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}

# Magic bytes mapping for common video formats
VIDEO_MAGIC_BYTES = {
    b'RIFF': 'avi', # AVI RIFF header
    b'\x00\x00\x00\x18ftyp': 'mp4', # MP4 ftyp
    b'\x00\x00\x00\x14ftyp': 'mp4', # MP4 ftyp variations
    b'\x00\x00\x00\x20ftyp': 'mp4',
    b'\x1a\x45\xdf\xa3': 'mkv',     # MKV EBML header
    b'\x00\x00\x00\x08wide': 'mov', # QuickTime MOV wide
    b'\x00\x00\x00\x08mdat': 'mov', # QuickTime MOV mdat
}

def allowed_file(filename):
    """
    Check if the file has an allowed extension.
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_mime_type(file_path):
    """
    Validate the file's actual MIME type and magic bytes to prevent shell uploads disguised as video.
    """
    # 1. Check file extension first
    if not allowed_file(os.path.basename(file_path)):
        return False
        
    # 2. Check Magic Bytes
    try:
        with open(file_path, 'rb') as f:
            header = f.read(32)
            
        # Match magic bytes
        matched = False
        for magic, ext in VIDEO_MAGIC_BYTES.items():
            if header.startswith(magic) or magic in header[:16]:
                matched = True
                break
                
        if not matched:
            # Fallback to standard mimetypes guess if magic bytes are slightly offset
            mime_type, _ = mimetypes.guess_type(file_path)
            if mime_type and mime_type.startswith('video/'):
                matched = True
        return matched
    except Exception:
        return False

def get_safe_filename(filename):
    """
    Secure and sanitize the input filename to prevent path traversal and shell injection.
    """
    safe_name = secure_filename(filename)
    if not safe_name:
        # Fallback in case secure_filename stripped everything
        import uuid
        safe_name = f"video_{uuid.uuid4().hex}.mp4"
    return safe_name
